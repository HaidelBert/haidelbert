package main

import (
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/HaidelBert/user/cmd/config"
	"github.com/HaidelBert/user/cmd/db"
	"github.com/HaidelBert/user/graph"
	"github.com/HaidelBert/user/graph/generated"
	"github.com/HaidelBert/user/pkg/auth"
	"github.com/HaidelBert/user/pkg/token"
	"github.com/HaidelBert/user/pkg/user"
	"github.com/go-chi/chi"
	"github.com/go-chi/cors"
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
)

const defaultPort = "9090"

func main() {
	config.Load()
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	session, err := db.Connect()
	defer session.Close()

	if err != nil {
		panic(err)
	}

	userRepository := user.RepositoryMongo{
		Collection: session.DB("user").C("users"),
	}

	router := chi.NewRouter()

	router.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"},
		AllowedHeaders:   []string{"*"},
		ExposedHeaders:   []string{"*"},
		AllowCredentials: true,
	}))
	secret := os.Getenv("JWT_SECRET")
	router.Use(token.Middleware(token.NewJwtDecoder(secret)))

	expiryInSeconds, expiryParseErr := strconv.ParseInt(os.Getenv("JWT_EXPIRY_SECONDS"), 10, 64)
	if expiryParseErr != nil {
		log.Fatal(expiryParseErr)
	}
	rootResolver := graph.NewResolver(
		auth.NewAuthorizer(token.NewJwtGenerator(secret, time.Duration(expiryInSeconds)), userRepository, auth.BcryptPasswordEncoder{}),
		userRepository,
	)
	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: rootResolver}))
	router.Route("/user", func(r chi.Router) {
		r.Handle("/", playground.Handler("GraphQL playground", "/user/query"))
		r.Handle("/query", srv)
	})

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
