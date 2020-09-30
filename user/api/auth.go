package api

import (
	"encoding/json"
	"github.com/HaidelBert/user/domain"
	"net/http"
)

type AuthController struct {
	authorizer domain.Authorizer
}

func NewAuthController(a domain.Authorizer) AuthController {
	return AuthController{
		authorizer: a,
	}
}

func (c AuthController) Login(res http.ResponseWriter, req *http.Request) {
	var credentials domain.Credentials
	err := json.NewDecoder(req.Body).Decode(&credentials)

	if err != nil {
		res.WriteHeader(http.StatusUnprocessableEntity)
		return
	}

	token, err := c.authorizer.GetToken(credentials)

	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	respondwithJSON(res, http.StatusOK, token)
}