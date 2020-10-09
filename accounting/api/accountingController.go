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
		respondWithError(res, req, err)
		return
	}

	newRecord, err := c.Service.AddRecord(claims.UserId, requestBody)
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	respondWithJSON(res, http.StatusCreated, newRecord)
}

func (c AccountingController) Get(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	nameFilter := req.URL.Query().Get("name")
	yearFilter, _ := strconv.ParseInt(req.URL.Query().Get("year"), 10, 64)
	quarterFilter, _ := strconv.ParseInt(req.URL.Query().Get("quarter"), 10, 64)
	monthFilter, _ := strconv.ParseInt(req.URL.Query().Get("month"), 10, 64)
	newRecord, err := c.Service.ListRecords(claims.UserId, accounting.Filter{
		Name: &nameFilter,
		Year: &yearFilter,
		Quarter: &quarterFilter,
		Month: &monthFilter,
	})
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	respondWithJSON(res, http.StatusOK, newRecord)
}

func (c AccountingController) Patch(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())
	var requestBody accounting.UpdateRecord
	err := json.NewDecoder(req.Body).Decode(&requestBody)
	if err != nil {
		respondWithError(res, req, err)
		return
	}

	recordId, err := strconv.ParseInt(chi.URLParam(req, "recordId"), 10, 64)
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	err = c.Service.ChangeRecord(claims.UserId, recordId, requestBody)
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	respondWithStatus(res, http.StatusOK)
}

func (c AccountingController) Delete(res http.ResponseWriter, req *http.Request) {
	claims := ForContext(req.Context())

	recordId, err := strconv.ParseInt(chi.URLParam(req, "recordId"), 10, 64)
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	err = c.Service.DeleteRecord(claims.UserId, recordId)
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	respondWithStatus(res, http.StatusOK)
}

func (c AccountingController) GetInternal(res http.ResponseWriter, req *http.Request) {
	nameFilter := req.URL.Query().Get("name")
	yearFilter, _ := strconv.ParseInt(req.URL.Query().Get("year"), 10, 64)
	quarterFilter, _ := strconv.ParseInt(req.URL.Query().Get("quarter"), 10, 64)
	monthFilter, _ := strconv.ParseInt(req.URL.Query().Get("month"), 10, 64)
	newRecord, err := c.Service.ListRecords(req.URL.Query().Get("user_id"), accounting.Filter{
		Name: &nameFilter,
		Year: &yearFilter,
		Quarter: &quarterFilter,
		Month: &monthFilter,
	})
	if err != nil {
		respondWithError(res, req, err)
		return
	}
	respondWithJSON(res, http.StatusOK, newRecord)
}