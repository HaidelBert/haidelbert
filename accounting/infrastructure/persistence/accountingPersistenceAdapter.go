package persistence

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/messaging"
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
	MessagingService messaging.Service
	ReceiptStorage storage.ReceiptStorage
}

func (s AccountingPersistenceAdapter) PersistRecord(userId string, input accounting.NewRecord) (*accounting.Record, error) {
	var err error
	var newRecord *accounting.Record

	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	storageIdentifier, err := s.ReceiptStorage.Store(input.Receipt)
	if err != nil {
		return nil, err
	}
	newRecord, err = s.Repository.Insert(*tx, input, userId, *storageIdentifier)
	if err != nil {
		return nil, err
	}
	err = s.MessagingService.Send(RecordCreatedTopic, newRecord)
	if err != nil {
		return nil, err
	}

	defer handleTx(tx, err)

	return newRecord, err
}

func (s AccountingPersistenceAdapter) ListRecords(userId string, filter accounting.Filter) ([]accounting.Record, error){

	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	records, err := s.Repository.Find(*tx, userId, filter)
	if err != nil {
		return nil, err
	}
	defer handleTx(tx, err)
	return records, err
}

func (s AccountingPersistenceAdapter) ChangeRecord(userId string, id int64, input accounting.UpdateRecord) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	var storageIdentifier *string
	if input.Receipt != nil {
		entity, err := s.Repository.GetById(*tx, userId, id)
		if err != nil {
			return err
		}
		storageIdentifier, err = s.ReceiptStorage.Store(*input.Receipt)
		if err != nil {
			return err
		}

		err = s.ReceiptStorage.Delete(entity.StorageIdentifier)
		if err != nil {
			return err
		}
	}
	changed, err := s.Repository.Update(*tx, userId, id, input, storageIdentifier)
	if err != nil {
		return nil
	}

	err = s.MessagingService.Send(RecordChangedTopic, changed)
	if err != nil {
		return err
	}

	defer handleTx(tx, err)
	return err
}

func (s AccountingPersistenceAdapter) DeleteRecord(userId string, id int64) error {
	tx, err := s.DB.Beginx()
	if err != nil {
		return err
	}

	entity, err := s.Repository.GetById(*tx, userId, id)
	if err != nil {
		return err
	}

	err = s.ReceiptStorage.Delete(entity.StorageIdentifier)
	if err != nil {
		return err
	}

	deleted, err := s.Repository.Delete(*tx, userId, id)
	if err != nil {
		return nil
	}
	err = s.MessagingService.Send(RecordDeletedTopic, deleted)
	if err != nil {
		return err
	}

	defer handleTx(tx, err)
	return err
}

func (s AccountingPersistenceAdapter) DownloadReceipt(userId string, id int64) (*accounting.ReceiptDownload, error) {
	tx, err := s.DB.Beginx()
	if err != nil {
		return nil, err
	}

	entity, err := s.Repository.GetById(*tx, userId, id)
	if err != nil {
		return nil, err
	}

	receipt, err := s.ReceiptStorage.Download(entity.StorageIdentifier)
	if err != nil {
		return nil, err
	}
	defer handleTx(tx, err)
	return receipt, err
}

func handleTx(tx *sqlx.Tx, err error) {
	if tx != nil {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}
}