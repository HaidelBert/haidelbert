package persistence

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/HaidelBert/accounting/infrastructure/config"
	"github.com/HaidelBert/accounting/infrastructure/migration"
	"github.com/HaidelBert/accounting/infrastructure/persistence/db"
	dbAccounting "github.com/HaidelBert/accounting/infrastructure/persistence/db/accounting"
	_ "github.com/golang-migrate/migrate/database/postgres"
	_ "github.com/golang-migrate/migrate/source/file"
	_ "github.com/jackc/pgx"
	_ "github.com/lib/pq"
	"log"
	"os"
	"testing"
)

func TestMain(m *testing.M) {
	log.Println("Setting up tests ...")
	os.Setenv("ENV", "ci")
	err := config.Load()
	if err != nil {
		os.Exit(1)
	}
	err = migration.Run()
	if err != nil {
		os.Exit(1)
	}
	code := m.Run()
	log.Println("... tearing down tests!")
	os.Exit(code)
}

type MockReceiptStorage struct{}

func (MockReceiptStorage) Store(receipt string) (*string, error){
	dummy := "asdf"
	return &dummy, nil
}
func (MockReceiptStorage) Download(key string) (*accounting.ReceiptDownload, error){
	return &accounting.ReceiptDownload{}, nil
}
func (MockReceiptStorage) Delete(key string) error{
	return nil
}

type MockMessagingService struct{}
func (MockMessagingService) Send(topic string, payload interface{}) error {
	return nil
}

func TestPersistRecord(t *testing.T) {
	connection := db.Connect()
	sut := AccountingPersistenceAdapter{
		DB: connection,
		Repository: &dbAccounting.Repository{},
		ReceiptStorage: MockReceiptStorage{},
		MessagingService: MockMessagingService{},
	}

	input := accounting.NewRecord{

	}
	_, err := sut.PersistRecord("1", input)

	if err != nil {
		t.Fatal("Failed")
	}
}