package accounting

type MoneyFlow string
const(
	Revenue MoneyFlow = "REVENUE"
	Expenditure MoneyFlow = "EXPENDITURE"
)

type ReceiptType string
const(
	Cash ReceiptType = "CASH"
	Bank ReceiptType = "BANK"
)

type NewRecord struct {
	BookingDate int `json:"bookingDate"`
	MoneyFlow MoneyFlow `json:"moneyFlow"`
	Description string `json:"description"`
	GrossAmount int  `json:"grossAmount"`
	TaxRate int `json:"taxRate"`
	ReceiptType ReceiptType `json:"receiptType"`
	Currency string `json:"currency"`
	CategoryId int `json:"categoryId"`
	ReverseCharge bool `json:"reverseCharge"`
}

type Category struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Record struct {
	ID            string    `json:"id"`
	RunningNumber int       `json:"runningNumber"`
	BookingDate   int       `json:"bookingDate"`
	MoneyFlow     string    `json:"moneyFlow"`
	Description   string    `json:"description"`
	GrossAmount   int       `json:"grossAmount"`
	TaxRate       int       `json:"taxRate"`
	ReceiptType   string    `json:"receiptType"`
	Currency      string    `json:"currency"`
	Category      *Category `json:"category"`
	ReverseCharge *bool     `json:"reverseCharge"`
}