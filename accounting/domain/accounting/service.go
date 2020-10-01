package accounting

import "github.com/HaidelBert/accounting/domain/validation"

type Service struct {
	PersistRecordPort PersistRecordPort
	RecordListPort RecordListPort
	ChangeRecordPort ChangeRecordPort
	DeleteRecordPort DeleteRecordPort
}

func (s Service) AddRecord(userId string, input NewRecord) (*Record, error){
	validationErr := validateNewRecord(input)
	if validationErr != nil {
		return nil, validationErr
	}
	newRecord, err := s.PersistRecordPort.PersistRecord(userId, input)

	return newRecord, err
}

func (s Service) ListAllRecords(userId string, filter Filter) ([]Record, error) {
	records, err := s.RecordListPort.ListRecords(userId, filter)
	return records, err
}

func (s Service) ChangeRecord(userId string, id int64, body UpdateRecord) error{
	err := s.ChangeRecordPort.ChangeRecord(userId, id, body)

	return err
}

func (s Service) DeleteRecord(userId string, id int64) error{
	err := s.DeleteRecordPort.DeleteRecord(userId, id)

	return err
}

func validateNewRecord(input NewRecord) error {
	fieldErrors := make(map[string][]string)
	if input.Category == "" {
		validation.AddFieldError(fieldErrors, "category", "must not be empty")
	}
	if input.Name == "" {
		validation.AddFieldError(fieldErrors, "name", "must not be empty")
	}
	if len(fieldErrors) > 0 {
		return validation.NewError("record not valid", fieldErrors)
	}
	return nil
}