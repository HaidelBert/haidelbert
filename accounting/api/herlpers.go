package api

import (
	"encoding/json"
	"github.com/HaidelBert/accounting/domain/validation"
	"log"
	"net/http"
)

type errorDto struct {
	cause error
	message string
}

func respondWithJSON(w http.ResponseWriter, code int, payload interface{}) {
	response, _ := json.Marshal(payload)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	w.Write(response)
}

func respondWithError(w http.ResponseWriter,req *http.Request, err error) {
	log.Printf("error happened in request %v %v %v", req.Method, req.URL.Path, err.Error())
	response, _ := json.Marshal(errorDto{
		message: err.Error(),
		cause: err,
	})

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
func respondWithStatus(w http.ResponseWriter, code int) {
	w.WriteHeader(code)
}