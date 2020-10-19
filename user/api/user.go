package api

import (
	"github.com/HaidelBert/user/domain"
	"net/http"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type UserController struct {
	service domain.UserService
}

func NewUserController(service domain.UserService) UserController {
	return UserController{
		service: service,
	}
}

func (c UserController) Me(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	me, err := c.service.GetDetails(claims.UserId)
	if err != nil {
		res.WriteHeader(http.StatusBadRequest)
		return
	}

	respondwithJSON(res, http.StatusOK, User{
		ID: me.ID,
		Email: me.Email,
		Username: me.Username,
	})
}