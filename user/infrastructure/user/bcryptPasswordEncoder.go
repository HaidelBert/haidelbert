package user

import "golang.org/x/crypto/bcrypt"

type BcryptPasswordEncoder struct{}

func (BcryptPasswordEncoder) Compare(hashedPassword string, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return false
	}
	return true
}

func (BcryptPasswordEncoder) Encode(password string) (*string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		return nil, err
	}
	hashedPassword := string(bytes)
	return &hashedPassword, nil
}
