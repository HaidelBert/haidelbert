package main

import (
	_ "database/sql"
	"fmt"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/golang-migrate/migrate"
	_ "github.com/golang-migrate/migrate/database/postgres"
	_ "github.com/golang-migrate/migrate/source/file"
	_ "github.com/jackc/pgx"
	_ "github.com/lib/pq"
	"os"
)

func main() {
	config.Load();
	m, err := migrate.New(
		"file://dbchangelog",
		"postgres://"+os.Getenv("POSTGRES_USER")+":"+os.Getenv("POSTGRES_PASSWORD")+"@"+os.Getenv("POSTGRES_HOST")+":"+os.Getenv("POSTGRES_PORT")+"/"+os.Getenv("POSTGRES_DB")+"?sslmode=disable")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	migrationErr := m.Up()
	if migrationErr != nil {
		fmt.Fprintf(os.Stderr, "Unable to migrate database: %v\n", err)
		os.Exit(1)
	}
}
