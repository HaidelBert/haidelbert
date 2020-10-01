package main

import (
	"github.com/HaidelBert/accounting/api"
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/HaidelBert/accounting/infrastructure/db"
	dbAccounting "github.com/HaidelBert/accounting/infrastructure/db/accounting"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"log"
	"net/http"
	"os"
)

func main() {
	config.Load();
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
	accountingInfrastructureService := infrastructure.AccountingService{
		DB: conn,
		Repository: accountingRepository,
	}
	accountingService := accounting.Service{
		PersistRecordPort: accountingInfrastructureService,
		RecordListPort: accountingInfrastructureService,
		ChangeRecordPort: accountingInfrastructureService,
		DeleteRecordPort: accountingInfrastructureService,
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
	})
	log.Printf("server is running on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}


