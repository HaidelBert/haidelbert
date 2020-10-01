package accounting

type PersistRecordPort interface {
	PersistRecord(input NewRecord) (*Record, error)
}