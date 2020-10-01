package api

import (
	"encoding/json"
	"github.com/HaidelBert/accounting/domain/accounting"
	"net/http"
)

type AccountingController struct {
	Service accounting.Service
}

func (c AccountingController) Post(res http.ResponseWriter, req *http.Request) {
	var requestBody accounting.NewRecord
	err := json.NewDecoder(req.Body).Decode(&requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}

	newRecord, err := c.Service.AddRecord(requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}
	respondwithJSON(res, http.StatusCreated, newRecord)
}
