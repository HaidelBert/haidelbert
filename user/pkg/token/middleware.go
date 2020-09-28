package token

import (
	"context"
	"net/http"
	"strings"
)

type tokenDecoder interface {
	decode(token string) (*Claims, error)
}

func Middleware(d tokenDecoder) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Header["Authorization"] != nil {
				authHeader := strings.Replace(r.Header["Authorization"][0], "Bearer ", "", 1)

				claims, err := d.decode(authHeader)

				if err != nil {
					http.Error(w, http.StatusText(401), 401)
					return
				}

				ctx := context.WithValue(r.Context(), "claims", claims)

				r = r.WithContext(ctx)
			}

			next.ServeHTTP(w, r)
		})
	}
}

func ForContext(ctx context.Context) *Claims {
	raw := ctx.Value("claims")
	return raw.(*Claims)
}
