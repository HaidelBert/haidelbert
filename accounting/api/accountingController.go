package api

import (
	"encoding/json"
	"github.com/HaidelBert/accounting/domain/accounting"
	"github.com/go-chi/chi"
	"net/http"
	"strconv"
)

type AccountingController struct {
	Service accounting.Service
}

func (c AccountingController) Post(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	var requestBody accounting.NewRecord
	err := json.NewDecoder(req.Body).Decode(&requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}

	newRecord, err := c.Service.AddRecord(claims.UserId, requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}
	respondwithJSON(res, http.StatusCreated, newRecord)
}

func (c AccountingController) Get(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	nameFilter := chi.URLParam(req, "name")
	newRecord, err := c.Service.ListAllRecords(claims.UserId, accounting.Filter{
		Name: &nameFilter,
	})
	if err != nil {
		respondWithError(res, err)
		return
	}
	respondwithJSON(res, http.StatusOK, newRecord)
}

func (c AccountingController) Patch(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	var requestBody accounting.UpdateRecord
	err := json.NewDecoder(req.Body).Decode(&requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}

	recordId, err := strconv.ParseInt(chi.URLParam(req, "recordId"), 10, 64)
	if err != nil {
		respondWithError(res, err)
		return
	}
	err = c.Service.ChangeRecord(claims.UserId, recordId, requestBody)
	if err != nil {
		respondWithError(res, err)
		return
	}
	respondWithStatus(res, http.StatusOK)
}

func (c AccountingController) Delete(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())

	recordId, err := strconv.ParseInt(chi.URLParam(req, "recordId"), 10, 64)
	if err != nil {
		respondWithError(res, err)
		return
	}
	err = c.Service.DeleteRecord(claims.UserId, recordId)
	if err != nil {
		respondWithError(res, err)
		return
	}
	respondWithStatus(res, http.StatusOK)
}