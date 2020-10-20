package db

import (
	"fmt"
	_ "github.com/jackc/pgx/stdlib"
	"github.com/jmoiron/sqlx"
	"os"
)

func Connect() *sqlx.DB {
	db, err := sqlx.Connect("pgx", "postgres://"+os.Getenv("POSTGRES_USER")+":"+os.Getenv("POSTGRES_PASSWORD")+"@"+os.Getenv("POSTGRES_HOST")+":"+os.Getenv("POSTGRES_PORT")+"/"+os.Getenv("POSTGRES_DB"))
	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	db.SetMaxIdleConns(10)
	db.SetMaxOpenConns(50)
	return db
}