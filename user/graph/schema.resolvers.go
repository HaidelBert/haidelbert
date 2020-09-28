package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"github.com/HaidelBert/user/graph/generated"
	"github.com/HaidelBert/user/graph/model"
)

func (r *queryResolver) Me(ctx context.Context) (*model.User, error) {
	return r.Resolver.Me(ctx)
}

func (r *queryResolver) Token(ctx context.Context, credentials model.Credentials) (*model.Token, error) {
	return r.Resolver.Token(ctx, credentials)
}

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type queryResolver struct{ *Resolver }
