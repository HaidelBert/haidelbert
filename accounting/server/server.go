package main

import (
	"fmt"
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/jackc/pgx"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/HaidelBert/accounting/api/graph"
	"github.com/HaidelBert/accounting/api/graph/generated"
)

const defaultPort = "8080"

func main() {
	config.Load();
	postgresPort, _ := strconv.ParseUint(os.Getenv("POSTGRES_PORT"), 10, 16)
	conn, err := pgx.Connect(pgx.ConnConfig{
		Password: os.Getenv("POSTGRES_PASSWORD"),
		User: os.Getenv("POSTGRES_USER"),
		Port: uint16(postgresPort),
		Host: os.Getenv("POSTGRES_HOST"),
	})
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close()

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}
	resolver := graph.NewResolver(accounting.Service{})

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(generated.Config{Resolvers: resolver}))

	http.Handle("/", playground.Handler("GraphQL playground", "/query"))
	http.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
