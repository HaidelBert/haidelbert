package infrastructure

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/db"
	db_accounting "github.com/HaidelBert/accounting/infrastructure/db/accounting"
	"github.com/jmoiron/sqlx"
)

type AccountingService struct {
	DB 	*sqlx.DB
	Repository 	db_accounting.Repository
}

func (s AccountingService) PersistRecord(userId string, input accounting.NewRecord) (*accounting.Record, error) {
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	newRecord, err := s.Repository.Insert(*tx, input, userId)

	dbErr := db.HandleError(*tx, err)
	if dbErr != nil {
		return nil, dbErr
	}

	return newRecord, nil
}

func (s AccountingService) ListRecords(userId string, filter accounting.Filter) ([]accounting.Record, error){
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	records, err := s.Repository.Find(*tx, userId, filter)

	dbErr := db.HandleError(*tx, err)

	return records, dbErr
}

func (s AccountingService) ChangeRecord(userId string, id int64, input accounting.UpdateRecord) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	err = s.Repository.Update(*tx, userId, id, input)

	dbErr := db.HandleError(*tx, err)

	return dbErr
}

func (s AccountingService) DeleteRecord(userId string, id int64) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	err = s.Repository.Delete(*tx, userId, id)

	dbErr := db.HandleError(*tx, err)

	return dbErr
}