package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"

	"github.com/HaidelBert/accounting/api/graph/generated"
	"github.com/HaidelBert/accounting/domain/accounting"
)

func (r *mutationResolver) AddRecord(ctx context.Context, input accounting.NewRecord) (*accounting.Record, error) {
	return r.AddRecord(ctx, input)
}

func (r *recordResolver) MoneyFlow(ctx context.Context, obj *accounting.Record) (accounting.MoneyFlow, error) {
	panic(fmt.Errorf("not implemented"))
}

func (r *recordResolver) ReceiptType(ctx context.Context, obj *accounting.Record) (accounting.ReceiptType, error) {
	panic(fmt.Errorf("not implemented"))
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Record returns generated.RecordResolver implementation.
func (r *Resolver) Record() generated.RecordResolver { return &recordResolver{r} }

type mutationResolver struct{ *Resolver }
type recordResolver struct{ *Resolver }
