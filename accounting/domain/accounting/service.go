package accounting

import "errors"

type AddRecordPort interface {
	AddRecord(input NewRecord) (*Record, error)
}

type Service struct {}

func (s Service) AddRecord(input NewRecord) (*Record, error){
	if !validateNewRecord(input) {
		return nil, errors.New("not a valid record")
	}

	return nil, nil
}

func validateNewRecord(input NewRecord) bool {
	return true
}