package auth

import (
	"errors"
	"github.com/HaidelBert/user/graph/model"
	"github.com/HaidelBert/user/pkg/user"
)

type userRepository interface {
	FindByUsernameOrEmail(usernameOrEmail string) (*user.Entity, error)
}

type generator interface {
	Generate(u model.User) (*model.Token, error)
}

type passwordEncoder interface {
	Compare(hashedPassword string, password string) bool
	Encode(password string) (*string, error)
}

type Authorizer struct {
	generator
	userRepository
	passwordEncoder
}

func NewAuthorizer(generator generator, userRepository userRepository, passwordEncoder passwordEncoder) Authorizer {
	return Authorizer{
		generator:       generator,
		userRepository:  userRepository,
		passwordEncoder: passwordEncoder,
	}
}

func (a Authorizer) GetToken(c model.Credentials) (*model.Token, error) {
	userEntity, err := a.userRepository.FindByUsernameOrEmail(c.UsernameOrEmail)
	if userEntity == nil || err != nil {
		return nil, errors.New("failed get token")
	}
	if !a.passwordEncoder.Compare(userEntity.Password, c.Password) {
		return nil, errors.New("failed get token")
	}
	generatedToken, _ := a.generator.Generate(model.User{
		ID:       userEntity.Id.Hex(),
		Email:    userEntity.Email,
		Username: userEntity.Username,
	})

	return generatedToken, nil
}
