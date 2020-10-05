package infrastructure

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/db"
	db_accounting "github.com/HaidelBert/accounting/infrastructure/db/accounting"
	"github.com/HaidelBert/accounting/infrastructure/messaging"
	"github.com/jmoiron/sqlx"
)

const RecordCreatedTopic = "accounting_record_created"

type AccountingPersistenceAdapter struct {
	DB 	*sqlx.DB
	Repository 	*db_accounting.Repository
	MessagingService *messaging.Service
}

func (s AccountingPersistenceAdapter) PersistRecord(userId string, input accounting.NewRecord) (*accounting.Record, error) {
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	newRecord, iErr := s.Repository.Insert(*tx, input, userId)
	iErr = rollbackOnError(tx, iErr)
	if iErr != nil {
		return nil, iErr
	}
	mErr := s.MessagingService.Send(RecordCreatedTopic, newRecord)
	mErr = rollbackOnError(tx, mErr)
	if mErr != nil {
		return nil, mErr
	}
	commitErr := tx.Commit()
	if commitErr != nil {
		return nil, commitErr
	}

	return newRecord, nil
}

func (s AccountingPersistenceAdapter) ListRecords(userId string, filter accounting.Filter) ([]accounting.Record, error){
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	records, err := s.Repository.Find(*tx, userId, filter)

	dbErr := db.HandleError(*tx, err)

	return records, dbErr
}

func (s AccountingPersistenceAdapter) ChangeRecord(userId string, id int64, input accounting.UpdateRecord) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	err = s.Repository.Update(*tx, userId, id, input)

	dbErr := db.HandleError(*tx, err)

	return dbErr
}

func (s AccountingPersistenceAdapter) DeleteRecord(userId string, id int64) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	err = s.Repository.Delete(*tx, userId, id)

	dbErr := db.HandleError(*tx, err)

	return dbErr
}

func rollbackOnError(tx *sqlx.Tx, err error) error {
	if err != nil {
		rollbackErr := tx.Rollback()
		if rollbackErr != nil {
			return rollbackErr
		}
		return err
	}
	return nil
}