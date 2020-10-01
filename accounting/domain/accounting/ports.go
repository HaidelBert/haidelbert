package accounting

type PersistRecordPort interface {
	PersistRecord(userId string, input NewRecord) (*Record, error)
}
type RecordListPort interface {
	ListRecords(userId string, filter Filter) ([]Record, error)
}
type ChangeRecordPort interface {
	ChangeRecord(userId string, id int64, input UpdateRecord) error
}
type DeleteRecordPort interface {
	DeleteRecord(userId string, id int64) error
}