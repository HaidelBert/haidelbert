package token

import (
	"github.com/HaidelBert/user/graph/model"
	"github.com/dgrijalva/jwt-go"
	"time"
)

type JwtGenerator struct {
	secret          string
	expiryInSeconds time.Duration
}

func NewJwtGenerator(secret string, expiryIndSeconds time.Duration) *JwtGenerator {
	return &JwtGenerator{
		secret:          secret,
		expiryInSeconds: expiryIndSeconds,
	}
}

func (g JwtGenerator) Generate(u model.User) (*model.Token, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userId": u.ID,
		"exp":    time.Now().Add(time.Second * g.expiryInSeconds).Unix(),
	})
	tokenString, err := token.SignedString([]byte(g.secret))
	if err != nil {
		return nil, err
	}

	return &model.Token{
		AccessToken: tokenString,
	}, nil
}
