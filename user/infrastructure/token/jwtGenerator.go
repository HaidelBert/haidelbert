package token

import (
	"github.com/HaidelBert/user/domain"
	"github.com/dgrijalva/jwt-go"
	b64 "encoding/base64"
	"os"
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

func (g JwtGenerator) Generate(u domain.UserMinimal) (*domain.Token, error) {
	privateKey, err := b64.StdEncoding.DecodeString(os.Getenv("JWT_PRIVATE_KEY"))
	if err != nil {
		return nil, err
	}
	signKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKey)
	token := jwt.NewWithClaims(jwt.SigningMethodRS256, jwt.MapClaims{
		"userId": u.ID,
		"exp":    time.Now().Add(time.Second * g.expiryInSeconds).Unix(),
		"groups": []string{"User"},
		"upn": u.ID,
	})
	tokenString, err := token.SignedString(signKey)
	if err != nil {
		return nil, err
	}

	return &domain.Token{
		AccessToken: tokenString,
	}, nil
}
