package domain

import (
	"errors"
)

type Authorizer struct {
	generator
	userRepository UserRepository
	passwordEncoder
}

func NewAuthorizer(generator generator, userRepository UserRepository, passwordEncoder passwordEncoder) Authorizer {
	return Authorizer{
		generator:       generator,
		userRepository:  userRepository,
		passwordEncoder: passwordEncoder,
	}
}

func (a Authorizer) GetToken(c Credentials) (*Token, error) {
	userEntity, err := a.userRepository.FindByUsernameOrEmail(c.UsernameOrEmail)
	if userEntity == nil || err != nil {
		return nil, errors.New("failed get token")
	}
	if !a.passwordEncoder.Compare(userEntity.Password, c.Password) {
		return nil, errors.New("failed get token")
	}
	generatedToken, _ := a.generator.Generate(userToMinimal(*userEntity))

	return generatedToken, nil
}
