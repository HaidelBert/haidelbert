package graph

import (
	"context"
	"github.com/HaidelBert/accounting/domain/accounting"
)

type Resolver struct{
	addRecordPort accounting.AddRecordPort
}

func NewResolver(
	addRecordPort accounting.AddRecordPort,
) *Resolver {
	return &Resolver{
		addRecordPort,
	}
}

func (r Resolver) AddRecord(ctx context.Context, input accounting.NewRecord) (*accounting.Record, error){
	newRecord, err := r.addRecordPort.AddRecord(input)

	if err != nil {
		return nil, err
	}

	return newRecord, nil
}