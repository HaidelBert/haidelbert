package infrastructure

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	db_accounting "github.com/HaidelBert/accounting/infrastructure/db/accounting"
	"github.com/jmoiron/sqlx"
)

type AccountingService struct {
	DB 	*sqlx.DB
	Repository 	db_accounting.Repository
}

func (s AccountingService) PersistRecord(input accounting.NewRecord) (*accounting.Record, error) {
	tx := s.DB.MustBegin()

	return s.Repository.Insert(*tx, input)
}