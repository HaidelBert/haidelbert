package io.haidelbertcom.example.annualfinancialstatements.persistence

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingRecord
import org.springframework.data.jpa.repository.JpaRepository

interface AnnualFinancialStatementRepository: JpaRepository<AnnualFinancialStatement, Long> {
    fun findByUserId(userId: String): List<AnnualFinancialStatement>
}
