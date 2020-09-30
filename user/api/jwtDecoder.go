package api

import (
	"fmt"
	"github.com/dgrijalva/jwt-go"
)

type JwtDecoder struct {
	secret string
}

func NewJwtDecoder(secret string) *JwtDecoder {
	return &JwtDecoder{
		secret: secret,
	}
}

func (d JwtDecoder) decode(tokenString string) (*Claims, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(d.secret), nil
	})
	if err != nil {
		return nil, err
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		return &Claims{
			UserId: fmt.Sprintf("%v", claims["userId"]),
		}, nil
	}
	return nil, err
}
