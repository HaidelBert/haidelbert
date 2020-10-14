package accounting

import "io"

type Category string
const(
	TaxAuthority Category = "TAX_AUTHORITY_PAYMENT"
	OfficeExpenditure Category = "OFFICE_EXPENDITURE"
	Marketing Category = "MARKETING"
	Travelling Category = "TRAVELLING"
	PostPhone Category = "POST_PHONE"
	Training Category = "TRAINING"
	MiscExpenditure Category = "MISC_EXPENDITURE"
	Sva Category = "SVA"
	ThirdPartyServices Category = "THIRD_PARTY_SERVICES"
	OfficeMaterials Category = "OFFICE_MATERIALS"
	Gwg Category = "GWG"
	InterestCharges Category = "INTEREST_CHARGES"
	Insurance Category = "INSURANCE"
	Literature Category = "LITERATURE"
	RevenueServices Category = "REVENUE_SERVICES"
	RevenueDepreciations Category = "REVENUE_DEPRECIATIONS"
)

func (e Category) String() string {
	extensions := [...]string{
		"TAX_AUTHORITY_PAYMENT",
		"OFFICE_EXPENDITURE",
		"MARKETING",
		"TRAVELLING",
		"POST_PHONE",
		"TRAINING",
		"MISC_EXPENDITURE",
		"SVA",
		"THIRD_PARTY_SERVICES",
		"OFFICE_MATERIALS",
		"GWG",
		"INTEREST_CHARGES",
		"INSURANCE",
		"LITERATURE",
		"REVENUE_SERVICES",
		"REVENUE_DEPRECIATIONS",
	}

	x := string(e)
	for _, v := range extensions {
		if v == x {
			return x
		}
	}

	return ""
}

type ReceiptType string
const(
	Cash ReceiptType = "CASH"
	Bank ReceiptType = "BANK"
)

func (e ReceiptType) String() string {
	extensions := [...]string{
		"CASH",
		"BANK",
	}

	x := string(e)
	for _, v := range extensions {
		if v == x {
			return x
		}
	}

	return ""
}

type NewRecord struct {
	BookingDate 	int64 		`json:"bookingDate"`
	Name 			string 		`json:"name"`
	GrossAmount 	int64  		`json:"grossAmount"`
	NetAmount 		int64  		`json:"netAmount"`
	TaxRate 		uint16 		`json:"taxRate"`
	ReceiptType 	ReceiptType `json:"receiptType"`
	Category 		Category 	`json:"category"`
	ReverseCharge 	bool 		`json:"reverseCharge"`
	IdUser			string		`json:"idUser"`
	Receipt			string		`json:"receipt"`
}

type UpdateRecord struct {
	BookingDate 	*int64 			`json:"bookingDate"`
	Name 			*string 		`json:"name"`
	GrossAmount 	*int64  		`json:"grossAmount"`
	NetAmount 		*int64  		`json:"netAmount"`
	TaxRate 		*uint16			`json:"taxRate"`
	ReceiptType 	*ReceiptType	`json:"receiptType"`
	Category 		*Category 		`json:"category"`
	ReverseCharge 	*bool 			`json:"reverseCharge"`
	Receipt 		*string 		`json:"receipt"`
}

type Record struct {
	ID            	int64    	`json:"id"`
	RunningNumber 	*int64      `json:"runningNumber"`
	BookingDate   	int64       `json:"bookingDate"`
	Name   			string    	`json:"name"`
	GrossAmount   	int64       `json:"grossAmount"`
	TaxRate       	uint16      `json:"taxRate"`
	ReceiptType   	ReceiptType `json:"receiptType"`
	Category      	Category 	`json:"category"`
	ReverseCharge 	bool     	`json:"reverseCharge"`
	UserId			string		`json:"userId"`
	NetAmount   	int64       `json:"netAmount"`
}

type Filter struct {
	Name *string
	Year *int64
	Quarter *int64
	Month *int64
}

type ReceiptDownload struct {
	Filename string
	MimeType string
	Content io.ReadCloser
}