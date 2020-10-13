package io.haidelbertcom.example.annualfinancialstatements.domain.model

import io.haidelbertcom.example.annualfinancialstatements.domain.FinancialAmount

class AnnualFinancialStatementSimulation(
        var sumGrossExpenditure: Long,
        var sumNetExpenditure: Long,
        var sumGrossRevenue: Long,
        var sumNetRevenue: Long,
        var result: Long,
        var details: Map<String, FinalFinancialAmount>
)
