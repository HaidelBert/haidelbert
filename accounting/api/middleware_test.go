package api

import (
	"github.com/go-chi/chi"
	"net/http"
	"net/http/httptest"
	"testing"
)

type MockDecoder struct {}

func (MockDecoder) decode(tokenString string) (*Claims, error) {
	return &Claims{
		UserId: tokenString,
	}, nil
}

func TestMiddlewareWithAccessToken_Ok(t *testing.T) {
	r := chi.NewRouter()
	r.Use(Middleware(MockDecoder{}))

	r.Get("/hi", func(w http.ResponseWriter, r *http.Request) {
		claims := ForContext(r.Context())
		if claims.UserId != "1" {
			t.Fatalf("Should pass")
		}
		w.Write([]byte("bye"))
	})
	ts := httptest.NewServer(r)

	req, _ := http.NewRequest("GET", ts.URL+"/hi", nil)

	req.Header.Set("Authorization", "Bearer 1")

	client := &http.Client{}
	res, err := client.Do(req)

	if err != nil {
		t.Fatalf("Should pass")
	}
	if res.StatusCode != 200 {
		t.Fatalf("Should return http 200")
	}
	defer ts.Close()
}

func TestMiddlewareWithAccessToken_Nok(t *testing.T) {
	r := chi.NewRouter()
	r.Use(Middleware(JwtDecoder{}))

	r.Get("/hi", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("bye"))
	})
	ts := httptest.NewServer(r)

	req, _ := http.NewRequest("GET", ts.URL+"/hi", nil)

	req.Header.Set("Authorization", "Bearer asdf")

	client := &http.Client{}
	res, _ := client.Do(req)

	if res.StatusCode != 401 {
		t.Fatalf("Should fail with 401")
	}
	defer ts.Close()
}
