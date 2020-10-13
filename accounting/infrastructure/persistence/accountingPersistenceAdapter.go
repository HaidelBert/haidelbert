package persistence

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/messaging"
	"github.com/HaidelBert/accounting/infrastructure/persistence/db"
	db_accounting "github.com/HaidelBert/accounting/infrastructure/persistence/db/accounting"
	"github.com/HaidelBert/accounting/infrastructure/persistence/storage"
	"github.com/jmoiron/sqlx"
)

const RecordCreatedTopic = "accounting_record_created"
const RecordChangedTopic = "accounting_record_changed"
const RecordDeletedTopic = "accounting_record_deleted"

type AccountingPersistenceAdapter struct {
	DB 	*sqlx.DB
	Repository 	*db_accounting.Repository
	MessagingService *messaging.Service
	ReceiptStorage storage.ReceiptStorageS3
}

func (s AccountingPersistenceAdapter) PersistRecord(userId string, input accounting.NewRecord) (*accounting.Record, error) {
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	storageIdentifier, err := s.ReceiptStorage.Store(input.Receipt)
	if err != nil {
		return nil, err
	}
	newRecord, iErr := s.Repository.Insert(*tx, input, userId, *storageIdentifier)
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

	changed, err := s.Repository.Update(*tx, userId, id, input)
	err = rollbackOnError(tx, err)
	if err != nil {
		return nil
	}

	err = s.MessagingService.Send(RecordChangedTopic, changed)
	err = rollbackOnError(tx, err)
	if err != nil {
		return err
	}

	dbErr := db.HandleError(*tx, err)

	return dbErr
}

func (s AccountingPersistenceAdapter) DeleteRecord(userId string, id int64) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	deleted, err := s.Repository.Delete(*tx, userId, id)
	err = rollbackOnError(tx, err)
	if err != nil {
		return nil
	}
	err = s.MessagingService.Send(RecordDeletedTopic, deleted)
	err = rollbackOnError(tx, err)
	if err != nil {
		return err
	}

	dbErr := db.HandleError(*tx, err)

	return dbErr
}

func (s AccountingPersistenceAdapter) DownloadReceipt(userId string, id int64) (*accounting.ReceiptDownload, error) {
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	entity, err := s.Repository.GetById(*tx, userId, id)
	err = rollbackOnError(tx, err)
	if err != nil {
		return nil, err
	}

	receipt, err := s.ReceiptStorage.Download(entity.StorageIdentifier)
	err = rollbackOnError(tx, err)
	if err != nil {
		return nil, err
	}

	err = db.HandleError(*tx, err)
	return receipt, err
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