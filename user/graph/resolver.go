package graph

import (
	"context"
	"github.com/HaidelBert/user/graph/model"
	"github.com/HaidelBert/user/pkg/auth"
	"github.com/HaidelBert/user/pkg/token"
	"github.com/HaidelBert/user/pkg/user"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type userRepository interface {
	FindById(id string) (*user.Entity, error)
}

type Resolver struct {
	authorizer     auth.Authorizer
	userRepository userRepository
}

func NewResolver(Authorizer auth.Authorizer, userRepository userRepository) *Resolver {
	return &Resolver{
		authorizer:     Authorizer,
		userRepository: userRepository,
	}
}

func (r *Resolver) Me(ctx context.Context) (*model.User, error) {
	claims := token.ForContext(ctx)
	entity, err := r.userRepository.FindById(claims.UserId)
	if err != nil {
		return nil, err
	}
	return &model.User{
		ID:       entity.Id.Hex(),
		Username: entity.Username,
		Email:    entity.Email,
	}, nil
}

func (r *Resolver) Token(ctx context.Context, credentials model.Credentials) (*model.Token, error) {
	return r.authorizer.GetToken(credentials)
}
