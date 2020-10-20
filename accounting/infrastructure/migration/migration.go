package migration

import (
	"fmt"
	"github.com/HaidelBert/accounting/internal/projectpath"
	"github.com/golang-migrate/migrate"
	"os"
)

func Run() error {
	m, err := migrate.New(
		"file://"+projectpath.Root+"/dbchangelog",
		"postgres://"+os.Getenv("POSTGRES_USER")+":"+os.Getenv("POSTGRES_PASSWORD")+"@"+os.Getenv("POSTGRES_HOST")+":"+os.Getenv("POSTGRES_PORT")+"/"+os.Getenv("POSTGRES_DB")+"?sslmode=disable")
	if err != nil {
		return err
	}
	migrationErr := m.Up()
	if migrationErr != nil {
		fmt.Fprintf(os.Stderr, "Unable to migrate database: %v\n", migrationErr)
		if migrationErr.Error() != "no change" {
			return migrationErr
		}
	}
	return nil
}