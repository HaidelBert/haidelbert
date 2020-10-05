package api

import (
	b64 "encoding/base64"
	"fmt"
	"github.com/dgrijalva/jwt-go"
	"os"
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
		if _, ok := token.Method.(*jwt.SigningMethodRSA); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		publicKey, err := b64.StdEncoding.DecodeString(os.Getenv("JWT_PUBLIC_KEY"))
		if err != nil {
			return nil, err
		}
		validationKey, err := jwt.ParseRSAPublicKeyFromPEM(publicKey)
		if err != nil {
			return nil, err
		}
		return validationKey, nil
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
