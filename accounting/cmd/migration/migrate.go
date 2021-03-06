package main

import (
	_ "database/sql"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/HaidelBert/accounting/infrastructure/migration"
	_ "github.com/golang-migrate/migrate/database/postgres"
	_ "github.com/golang-migrate/migrate/source/file"
	_ "github.com/jackc/pgx"
	_ "github.com/lib/pq"
	"log"
	"os"
)

func main() {
	err := config.Load()
	if err != nil {
		os.Exit(1)
	}
	err = migration.Run()
	if err != nil {
		log.Printf("Unable to migrate database: %v\n", err)
		os.Exit(1)
	}
}

