package main

import (
	"fmt"
	"github.com/HaidelBert/accounting/api"
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/HaidelBert/accounting/infrastructure/db"
	dbAccounting "github.com/HaidelBert/accounting/infrastructure/db/accounting"
	"github.com/HaidelBert/accounting/infrastructure/messaging"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"gopkg.in/confluentinc/confluent-kafka-go.v1/kafka"
	"log"
	"net/http"
	"os"
)

func main() {
	config.Load();

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
	messagingService := messaging.Service{
		Producer: producer,
	}
	accountingPersistenceAdapter := infrastructure.AccountingPersistenceAdapter{
		DB: conn,
		Repository: &accountingRepository,
		MessagingService: &messagingService,
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
		})
		rootRouter.Route("/internal", func(protectedRouter chi.Router) {
			protectedRouter.Use(api.InternalMiddleware())
			protectedRouter.Get("/", accountingController.GetInternal)
		})
	})
	log.Printf("server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}


