package domain

import (
	"testing"
)

type MockPasswordEncoder struct {
	compareResult bool
}

func (m MockPasswordEncoder) Compare(hashedPassword string, password string) bool {
	return m.compareResult
}

func (MockPasswordEncoder) Encode(password string) (*string, error) {
	return &password, nil
}

func newMockPasswordEncoder(compareResult bool) PasswordEncoder {
	return MockPasswordEncoder{
		compareResult: compareResult,
	}
}

type MockTokenGenerator struct {
}

func (MockTokenGenerator) Generate(u UserMinimal) (*Token, error){
	return &Token{}, nil
}

type MockUserRepository struct {
	findByUsernameOrEmailMock func(usernameOrEmail string) (*User, error)
}

func (mock MockUserRepository) FindByUsernameOrEmail(usernameOrEmail string) (*User, error) {
	if mock.findByUsernameOrEmailMock != nil {
		return mock.findByUsernameOrEmailMock(usernameOrEmail)
	}
	return nil, nil
}

func (mock MockUserRepository) FindById(id string) (*User, error) {
	return nil, nil
}

func TestAuthorizer_GetToken_NoUser(t *testing.T) {
	a := Authorizer{
		userRepository: MockUserRepository{},
	}
	_, err := a.GetToken(Credentials{
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
			findByUsernameOrEmailMock: func(usernameOrEmail string) (*User, error) {
				return &User{
					Username: "123",
					Password: "123",
				}, nil
			},
		},
		passwordEncoder: newMockPasswordEncoder(false),
	}
	_, err := a.GetToken(Credentials{
		UsernameOrEmail: "asdf",
		Password:        "asdf",
	})
	if err == nil {
		t.Fatalf("Should fail")
	}
}

func TestAuthorizer_GetToken_Ok(t *testing.T) {
	passwordEncoder := MockPasswordEncoder{}
	encodedPassword, _ := passwordEncoder.Encode("123")
	a := Authorizer{
		userRepository: MockUserRepository{
			findByUsernameOrEmailMock: func(usernameOrEmail string) (*User, error) {
				return &User{
					Username: "asdf",
					Password: *encodedPassword,
				}, nil
			},
		},
		passwordEncoder: newMockPasswordEncoder(true),
		generator:       MockTokenGenerator{},
	}
	_, err := a.GetToken(Credentials{
		UsernameOrEmail: "asdf",
		Password:        "123",
	})
	if err != nil {
		t.Fatalf("Should run without errors")
	}
}
