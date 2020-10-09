package io.haidelbertcom.example.annualfinancialstatements.api

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingClient
import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingRecord
import io.haidelbertcom.example.annualfinancialstatements.domain.AnnualFinancialStatementService
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatementRepository
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class AnnualFinancialStatementsResource(
       private val annualFinancialStatementService: AnnualFinancialStatementService
) {

    @GetMapping("/protected/annual-financial-statements")
    fun list(auth: Authentication): List<AnnualFinancialStatement> {
        return annualFinancialStatementService.list(auth.principal.toString())
    }

    @PostMapping("/protected/annual-financial-statements")
    fun add(@RequestParam("year") year: Int, auth: Authentication): AnnualFinancialStatement {
        return annualFinancialStatementService.add(auth.principal.toString(), year)
    }
}
