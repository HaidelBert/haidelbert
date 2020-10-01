package api

import (
	"encoding/json"
	"github.com/HaidelBert/accounting/domain/validation"
	"net/http"
)

func respondwithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func respondWithError(w http.ResponseWriter, err error) {
	response, _ := json.Marshal(err)

	w.Header().Set("Content-Type", "application/json")
	switch err.(type) {
		case *json.InvalidUnmarshalError:
		case *json.UnmarshalTypeError:
			w.WriteHeader(http.StatusUnprocessableEntity)
			break
		case validation.Error:
			w.WriteHeader(http.StatusBadRequest)
			break
		default:
			w.WriteHeader(http.StatusInternalServerError)
			break
	}
	w.Write(response)
}