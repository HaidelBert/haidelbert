package domain

import (
	"github.com/HaidelBert/user/graph/model"
	"github.com/HaidelBert/user/infrastructure/token"
	"github.com/HaidelBert/user/infrastructure/user"
	"testing"
)

type MockUserRepository struct {
	findByUsernameOrEmailMock func(usernameOrEmail string) (*user.Entity, error)
}

func (mock MockUserRepository) FindByUsernameOrEmail(usernameOrEmail string) (*user.Entity, error) {
	if mock.findByUsernameOrEmailMock != nil {
		return mock.findByUsernameOrEmailMock(usernameOrEmail)
	}
	return nil, nil
}

func TestAuthorizer_GetToken_NoUser(t *testing.T) {
	a := Authorizer{
		userRepository: MockUserRepository{},
	}
	_, err := a.GetToken(model.Credentials{
		UsernameOrEmail: "",
		Password:        "",
	})
	if err == nil {
		t.Fatalf("Should fail")
	}
}

func TestAuthorizer_GetToken_WrongPassword(t *testing.T) {
	a := Authorizer{
		userRepository: MockUserRepository{
			findByUsernameOrEmailMock: func(usernameOrEmail string) (*user.Entity, error) {
				return &user.Entity{
					Username: "123",
					Password: "123",
				}, nil
			},
		},
		passwordEncoder: user.BcryptPasswordEncoder{},
	}
	_, err := a.GetToken(model.Credentials{
		UsernameOrEmail: "asdf",
		Password:        "asdf",
	})
	if err == nil {
		t.Fatalf("Should fail")
	}
}

func TestAuthorizer_GetToken_Ok(t *testing.T) {
	passwordEncoder := user.BcryptPasswordEncoder{}
	encodedPassword, _ := passwordEncoder.Encode("123")
	a := Authorizer{
		userRepository: MockUserRepository{
			findByUsernameOrEmailMock: func(usernameOrEmail string) (*user.Entity, error) {
				return &user.Entity{
					Username: "asdf",
					Password: *encodedPassword,
				}, nil
			},
		},
		passwordEncoder: user.BcryptPasswordEncoder{},
		generator:       token.JwtGenerator{},
	}
	_, err := a.GetToken(model.Credentials{
		UsernameOrEmail: "asdf",
		Password:        "123",
	})
	if err != nil {
		t.Fatalf("Should run without errors")
	}
}
