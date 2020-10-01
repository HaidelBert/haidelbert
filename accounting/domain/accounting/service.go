package accounting

import "github.com/HaidelBert/accounting/domain/validation"

type Service struct {
	PersistRecordPort PersistRecordPort
}

func (s Service) AddRecord(input NewRecord) (*Record, error){
	validationErr := validateNewRecord(input)
	if validationErr != nil {
		return nil, validationErr
	}
	newRecord, err := s.PersistRecordPort.PersistRecord(input)

	if err != nil {
		return nil, err
	}

	return newRecord, nil
}

func validateNewRecord(input NewRecord) error {
	fieldErrors := make(map[string][]string)
	if input.Category == "" {
		validation.AddFieldError(fieldErrors, "category", "must not be empty")
	}
	if input.Name == "" {
		validation.AddFieldError(fieldErrors, "name", "must not be empty")
	}
	return nil
}