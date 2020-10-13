package dbAccounting

import (
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/jmoiron/sqlx"
	"github.com/thoas/go-funk"
	"strconv"
	"strings"
	"time"
)

type Repository struct {}

func (r Repository) Insert(tx sqlx.Tx, newRecord accounting.NewRecord, userId string, storageIdentifier string) (*accounting.Record, error) {
	newRecordEntity := Entity{
		BookingDate: time.Unix(newRecord.BookingDate, 0),
		Name: newRecord.Name,
		Category: newRecord.Category.String(),
		GrossAmount: newRecord.GrossAmount,
		ReceiptType: newRecord.ReceiptType.String(),
		ReverseCharge: newRecord.ReverseCharge,
		TaxRate: newRecord.TaxRate,
		UserId: userId,
		StorageIdentifier: storageIdentifier,
	}
	result, err := tx.NamedExec(`INSERT INTO accounting_records(booking_date, name, receipt_type, tax_rate, gross_amount, category, id_user, reverse_charge, storage_identifier) VALUES(:booking_date,:name,:receipt_type, :tax_rate, :gross_amount, :category, :id_user, :reverse_charge, :storage_identifier)`, newRecordEntity)
	if err != nil {
		return nil, err
	}
	id, _ := result.LastInsertId()
	newRecordEntity.ID = id
	return fromEntityToDomain(newRecordEntity), nil
}

func (r Repository) Find(tx sqlx.Tx, userId string, filter accounting.Filter) ([]accounting.Record, error) {
	where := "id_user=$1"
	params := make([]interface{}, 0)
	params = append(params, userId)
	if filter.Name != nil && *filter.Name != ""{
		params = append(params, "%"+strings.ToLower(*filter.Name)+"%")
		where += " AND LOWER(name) LIKE $"+strconv.Itoa(len(params))+""
	}
	if filter.Year != nil && *filter.Year > 0 {
		params = append(params, *filter.Year)
		where += " AND extract(year from booking_date)=$"+strconv.Itoa(len(params))
	}
	if filter.Quarter != nil && *filter.Quarter > 0 {
		params = append(params, *filter.Quarter)
		where += " AND extract(quarter from booking_date)=$"+strconv.Itoa(len(params))
	}
	if filter.Month != nil && *filter.Month > 0 {
		params = append(params, *filter.Month)
		where += " AND extract(month from booking_date)=$"+strconv.Itoa(len(params))
	}
	list := []Entity{}
	err := tx.Select(&list, "SELECT * FROM accounting_records where "+where+" ORDER BY booking_date DESC", params...)
	if err != nil {
		return nil, err
	}
	return fromEntitySlice(list), nil
}

func (r Repository) Update(tx sqlx.Tx, userId string, id int64, input accounting.UpdateRecord) (*accounting.Record, error) {
	tmp := Entity{}
	err := tx.Get(&tmp, "SELECT * FROM accounting_records WHERE id=$1 and id_user=$2",id, userId)
	if err != nil {
		return nil, err
	}
	if input.TaxRate != nil {
		tmp.TaxRate = *input.TaxRate
	}
	if input.ReceiptType != nil {
		tmp.ReceiptType = input.ReceiptType.String()
	}
	if input.Name != nil {
		tmp.Name = *input.Name
	}
	if input.Category != nil {
		tmp.Category = input.Category.String()
	}
	if input.GrossAmount != nil {
		tmp.GrossAmount = *input.GrossAmount
	}
	if input.ReverseCharge != nil {
		tmp.ReverseCharge = *input.ReverseCharge
	}
	if input.BookingDate!= nil {
		tmp.BookingDate = time.Unix(*input.BookingDate, 0)
	}
	_, err = tx.NamedExec("UPDATE accounting_records set booking_date=:booking_date, name=:name, receipt_type=:receipt_type, tax_rate=:tax_rate, gross_amount=:gross_amount, category=:category, reverse_charge=:reverse_charge, updated_ts=CURRENT_TIMESTAMP where id=:id and id_user=:id_user", tmp)

	return fromEntityToDomain(tmp), err
}

func (r Repository) Delete(tx sqlx.Tx, userId string, id int64) (*accounting.Record, error) {
	tmp := Entity{}
	err := tx.Get(&tmp, "SELECT * FROM accounting_records WHERE id=$1 and id_user=$2", id, userId)
	_, err = tx.Exec(`DELETE from accounting_records WHERE id=$1 AND id_user=$2`,id, userId);

	return fromEntityToDomain(tmp), err
}

func (r Repository) GetById(tx sqlx.Tx, userId string, id int64) (*Entity, error) {
	tmp := Entity{}
	err := tx.Get(&tmp, "SELECT * FROM accounting_records where id_user=$1 and id=$2", userId, id)
	if err != nil {
		return nil, err
	}
	return &tmp, nil
}

func fromEntitySlice(input []Entity) []accounting.Record {
	return funk.Map(input, func(entity Entity) accounting.Record {
		return *fromEntityToDomain(entity)
	}).([]accounting.Record)
}

func fromEntityToDomain(e Entity) *accounting.Record {
	return &accounting.Record{
		ID: e.ID,
		BookingDate: e.BookingDate.Unix(),
		Category: accounting.Category(e.Category),
		GrossAmount: e.GrossAmount,
		Name: e.Name,
		ReceiptType: accounting.ReceiptType(e.ReceiptType),
		ReverseCharge: e.ReverseCharge,
		TaxRate: e.TaxRate,
		UserId: e.UserId,
	}
}