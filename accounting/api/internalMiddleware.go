package api

import (
	b64 "encoding/base64"
	"net/http"
	"os"
	"strings"
)

func InternalMiddleware() func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			if r.Header["Authorization"] != nil {
				authHeader := strings.Replace(r.Header["Authorization"][0], "Basic ", "", 1)

				bytes, err := b64.StdEncoding.DecodeString(authHeader)

				if err != nil {
					http.Error(w, http.StatusText(401), 401)
					return
				}
				parts := strings.Split(string(bytes), ":")
				if os.Getenv("CLIENT_"+parts[0]) != parts[1] {
					http.Error(w, http.StatusText(401), 401)
					return
				}
			} else {
				http.Error(w, http.StatusText(401), 401)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}