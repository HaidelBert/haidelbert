package dbAccounting

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/jackc/pgx/pgtype"
	"github.com/jmoiron/sqlx"
	"time"
)

type Entity struct {
	ID            	int64 `db:"id"`
	RunningNumber 	int `db:"running_number"`
	BookingDate   	pgtype.Date `db:"booking_date"`
	Name   			string `db:"name"`
	GrossAmount   	int `db:"gross_amount"`
	TaxRate       	int `db:"tax_rate"`
	ReceiptType   	string `db:"receipt_type"`
	Category      	string `db:"category"`
	ReverseCharge 	bool `db:"reverse_charge"`
	IdUser 			string `db:"id_user"`
}

type NewRecordEntity struct {
	bookingDate 	time.Time
	name 			string
	grossAmount 	int64
	taxRate 		uint16
	receiptType 	string
	currency 		string
	category 		string
	reverseCharge 	bool
}

type Repository struct {}

func (r Repository) Insert(tx sqlx.Tx, newRecord accounting.NewRecord) (*accounting.Record, error) {

	newRecordEntity := NewRecordEntity{
		bookingDate: time.Unix(newRecord.BookingDate, 0),
		name: newRecord.Name,
		category: newRecord.Category.String(),
		currency: newRecord.Currency,
		grossAmount: newRecord.GrossAmount,
		receiptType: newRecord.ReceiptType.String(),
		reverseCharge: newRecord.ReverseCharge,
		taxRate: newRecord.TaxRate,
	}
	result, err := tx.NamedExec(`INSERT INTO accounting_records(booking_date, name, receipt_type, tax_rate, gross_amount, category, id_user) VALUES(:booking_date,:name,:receipt_type, :tax_rate, :gross_amount, :category, :id_user)`, newRecordEntity)
	if err != nil {
		return nil, err
	}
	id, _ := result.LastInsertId()
	return &accounting.Record{
		ID: id,
		BookingDate: newRecord.BookingDate,
		Category: newRecord.Category,
		Currency: newRecord.Currency,
		GrossAmount: newRecord.GrossAmount,
		Name: newRecord.Name,
		ReceiptType: newRecord.ReceiptType,
		ReverseCharge: newRecord.ReverseCharge,
	}, nil
}