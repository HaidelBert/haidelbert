package main

import (
	"github.com/HaidelBert/user/api"
	"github.com/HaidelBert/user/cmd/config"
	"github.com/HaidelBert/user/domain"
	"github.com/HaidelBert/user/infrastructure/db"
	"github.com/HaidelBert/user/infrastructure/token"
	"github.com/HaidelBert/user/infrastructure/user"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"gopkg.in/mgo.v2"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

func checkMongo(session *mgo.Session) {
	for {
		time.Sleep(5000 * time.Millisecond)
		err := session.Ping()
		if err != nil {
			panic(err)
		}
	}
}

func main() {
	config.Load()
	port := os.Getenv("PORT")
	session, err := db.Connect()

	if err != nil {
		panic(err)
	}
	go checkMongo(session)
	defer session.Close()

	userRepository := user.RepositoryMongo{
		Collection: session.DB("user").C("users"),
	}
	userService := domain.NewUserService(userRepository)

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))

	expiryInSeconds, expiryParseErr := strconv.ParseInt(os.Getenv("JWT_EXPIRY_SECONDS"), 10, 64)
	if expiryParseErr != nil {
		log.Fatal(expiryParseErr)
	}
	authorizer := domain.NewAuthorizer(token.NewJwtGenerator(time.Duration(expiryInSeconds)), userRepository, user.BcryptEncoder{})
	authController := api.NewAuthController(authorizer)

	userController := api.NewUserController(userService)

	router.Route("/user/api", func(rootRouter chi.Router) {
		rootRouter.Route("/public", func(publicRouter chi.Router) {
			publicRouter.Post("/token", authController.Login)
		})
		rootRouter.Route("/protected", func(protectedRouter chi.Router) {
			protectedRouter.Use(api.Middleware(api.NewJwtDecoder()))
			protectedRouter.Get("/me", userController.Me)
		})
	})

	log.Fatal(http.ListenAndServe(":"+port, router))
}
