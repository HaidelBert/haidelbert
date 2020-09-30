package api

import (
	"github.com/HaidelBert/user/graph/model"
	token2 "github.com/HaidelBert/user/infrastructure/token"
	"github.com/go-chi/chi"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestMiddlewareWithAccessToken_Ok(t *testing.T) {
	r := chi.NewRouter()
	r.Use(Middleware(JwtDecoder{}))

	r.Get("/hi", func(w http.ResponseWriter, r *http.Request) {
		claims := ForContext(r.Context())
		if claims.UserId != "123" {
			t.Fatalf("Should pass")
		}
		w.Write([]byte("bye"))
	})
	ts := httptest.NewServer(r)

	req, _ := http.NewRequest("GET", ts.URL+"/hi", nil)

	token, _ := generateToken()
	req.Header.Set("Authorization", "Bearer "+token.AccessToken)

	client := &http.Client{}
	_, err := client.Do(req)

	if err != nil {
		t.Fatalf("Should pass")
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

func generateToken() (*model.Token, error) {
	return token2.JwtGenerator{}.Generate(model.User{
		ID:       "123",
		Username: "HaidelBert",
		Email:    "test@google.at",
	})
}
