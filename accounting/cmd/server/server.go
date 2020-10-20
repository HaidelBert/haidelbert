package main

import (
	"fmt"
	"github.com/HaidelBert/accounting/api"
	"github.com/HaidelBert/accounting/domain/accounting"
	random "github.com/HaidelBert/accounting/infrastructure"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/HaidelBert/accounting/infrastructure/messaging"
	"github.com/HaidelBert/accounting/infrastructure/persistence"
	"github.com/HaidelBert/accounting/infrastructure/persistence/db"
	dbAccounting "github.com/HaidelBert/accounting/infrastructure/persistence/db/accounting"
	"github.com/HaidelBert/accounting/infrastructure/persistence/storage"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"github.com/jmoiron/sqlx"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

func checkDb(connection *sqlx.DB) {
	for {
		time.Sleep(5000 * time.Millisecond)
		err := connection.Ping()
		if err != nil {
			panic(err)
		}
	}
}

func main() {
	Run()
}

func Run() {
	random.Init()
	config.Load()

	s3Endpoint := os.Getenv("AWS_S3_ENDPOINT")
	s3Region := os.Getenv("AWS_S3_REGION")
	s3DisableSsl, err := strconv.ParseBool(os.Getenv("AWS_S3_DISABLE_SSL"))
	s3ForcePathStyle, err := strconv.ParseBool(os.Getenv("AWS_S3_FORCE_PATH_STYLE"))
	s3Config := &aws.Config{
		Credentials:      credentials.NewStaticCredentials(os.Getenv("AWS_S3_ID"), os.Getenv("AWS_S3_SECRET"), ""),
		Endpoint:         &s3Endpoint,
		Region:           aws.String(s3Region),
		DisableSSL:       aws.Bool(s3DisableSsl),
		S3ForcePathStyle: aws.Bool(s3ForcePathStyle),
	}
	newSession, err := session.NewSession(s3Config)
	s3Client := s3.New(newSession)
	receiptBucket := os.Getenv("AWS_S3_RECEIPT_BUCKET")
	receiptStorage := storage.ReceiptStorageS3{
		Bucket: &receiptBucket,
		S3Client: s3Client,
	}

	producer, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": os.Getenv("KAFKA_SERVERS")})
	if err != nil {
		panic(err)
	}
	go func() {
		for e := range producer.Events() {
			switch ev := e.(type) {
			case *kafka.Message:
				if ev.TopicPartition.Error != nil {
					fmt.Printf("Delivery failed: %v\n", ev.TopicPartition)
				} else {
					fmt.Printf("Delivered message to %v\n", ev.TopicPartition)
				}
			}
		}
	}()
	log.Printf("connected to kafka via %s", os.Getenv("KAFKA_SERVERS"))
	defer producer.Close()

	conn := db.Connect()
	go checkDb(conn)
	defer conn.Close()

	port := os.Getenv("PORT")
	secret := os.Getenv("JWT_SECRET")

	router := chi.NewRouter()
	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))

	accountingRepository := dbAccounting.Repository{}
	messagingService := messaging.KafkaService{
		Producer: producer,
	}
	accountingPersistenceAdapter := persistence.AccountingPersistenceAdapter{
		DB: conn,
		Repository: &accountingRepository,
		MessagingService: messagingService,
		ReceiptStorage: receiptStorage,
	}
	accountingService := accounting.Service{
		PersistencePort: accountingPersistenceAdapter,
	}
	accountingController := api.AccountingController{
		Service: accountingService,
	}

	router.Route("/accounting/api", func(rootRouter chi.Router) {
		rootRouter.Route("/public", func(publicRouter chi.Router) {

		})
		rootRouter.Route("/protected", func(protectedRouter chi.Router) {
			protectedRouter.Use(api.Middleware(api.NewJwtDecoder(secret)))
			protectedRouter.Post("/", accountingController.Post)
			protectedRouter.Get("/", accountingController.Get)
			protectedRouter.Patch("/{recordId}", accountingController.Patch)
			protectedRouter.Delete("/{recordId}", accountingController.Delete)
			protectedRouter.Get("/{recordId}/receipt", accountingController.DownloadReceipt)
		})
		rootRouter.Route("/internal", func(protectedRouter chi.Router) {
			protectedRouter.Use(api.InternalMiddleware())
			protectedRouter.Get("/", accountingController.GetInternal)
		})
	})
	log.Printf("server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}


