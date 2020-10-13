package io.haidelbertcom.example.annualfinancialstatements.domain.model

import io.haidelbertcom.example.annualfinancialstatements.domain.FinancialAmount

class AnnualFinancialStatementModel(
        var id: Long? = null,
        var year: Int,
        var sumGrossExpenditure: Long,
        var sumNetExpenditure: Long,
        var sumGrossRevenue: Long,
        var sumNetRevenue: Long,
        var result: Long,
        var details: Map<String, FinalFinancialAmount>,
        var userId: String,
        var taxAuthoritySubmitted: Boolean
)
