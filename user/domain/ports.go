package domain

type Generator interface {
	Generate(u UserMinimal) (*Token, error)
}

type PasswordEncoder interface {
	Compare(hashedPassword string, password string) bool
	Encode(password string) (*string, error)
}

type UserRepository interface {
	FindById(id string) (*User, error)
	FindByUsernameOrEmail(usernameOrEmail string) (*User, error)
}