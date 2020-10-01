package dbAccounting

import "time"

type Entity struct {
	ID            	int64 `db:"id"`
	RunningNumber 	*int `db:"running_number"`
	BookingDate   	time.Time `db:"booking_date"`
	Name   			string `db:"name"`
	GrossAmount   	int64 `db:"gross_amount"`
	TaxRate       	uint16 `db:"tax_rate"`
	ReceiptType   	string `db:"receipt_type"`
	Category      	string `db:"category"`
	ReverseCharge 	bool `db:"reverse_charge"`
	IdUser 			string `db:"id_user"`
	Created			time.Time  `db:"created_ts"`
	Updated			time.Time  `db:"updated_ts"`
}