package io.haidelbertcom.example.annualfinancialstatements.api

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class AnnualFinancialStatementsResource {

    @GetMapping("/protected/annual-financial-statements")
    fun list(): List<String> {
        return listOf("Test")
    }
}
