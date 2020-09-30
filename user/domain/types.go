package domain

type Credentials struct {
	UsernameOrEmail string `json:"usernameOrEmail"`
	Password        string `json:"password"`
}

type Token struct {
	AccessToken string `json:"accessToken"`
}

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Password    string `json:"password"`
}

type UserMinimal struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

func userToMinimal(u User) UserMinimal {
	return UserMinimal{
		ID:       u.ID,
		Email:    u.Email,
		Username: u.Username,
	}
}