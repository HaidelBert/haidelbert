package accounting

type PersistencePort interface {
	PersistRecord(userId string, input NewRecord) (*Record, error)
	ListRecords(userId string, filter Filter) ([]Record, error)
	ChangeRecord(userId string, id int64, input UpdateRecord) error
	DeleteRecord(userId string, id int64) error
}