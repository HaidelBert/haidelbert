package io.haidelbertcom.example.annualfinancialstatements.api

import io.haidelbertcom.example.annualfinancialstatements.domain.AnnualFinancialStatementFacade
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementModel
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementSimulation
import io.haidelbertcom.example.annualfinancialstatements.domain.model.ChangeAnnualFinancialStatement
import org.springframework.security.core.Authentication
import org.springframework.web.bind.annotation.*

@RestController
class AnnualFinancialStatementsResource(
       private val annualFinancialStatementFacade: AnnualFinancialStatementFacade
) {

    @GetMapping("/protected/annual-financial-statements")
    fun list(auth: Authentication): List<AnnualFinancialStatementModel> {
        return annualFinancialStatementFacade.list(auth.principal.toString())
    }

    @PostMapping("/protected/annual-financial-statements")
    fun add(@RequestParam("year") year: Int, auth: Authentication): AnnualFinancialStatementModel {
        return annualFinancialStatementFacade.add(auth.principal.toString(), year)
    }

    @PostMapping("/protected/annual-financial-statements/simulate")
    fun simulate(@RequestParam("year") year: Int, auth: Authentication): AnnualFinancialStatementSimulation {
        return annualFinancialStatementFacade.simulate(auth.principal.toString(), year)
    }

    @PatchMapping("/protected/annual-financial-statements/{id}")
    fun simulate(@PathVariable id: Long, auth: Authentication, @RequestBody patch: ChangeAnnualFinancialStatement) {
        annualFinancialStatementFacade.change(auth.principal.toString(), id, patch)
    }
}
