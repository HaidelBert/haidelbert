package io.haidelbertcom.example.annualfinancialstatements.persistence

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingRecord
import org.springframework.data.jpa.repository.JpaRepository

interface AnnualFinancialStatementRepository: JpaRepository<AnnualFinancialStatement, Long> {
    fun findByUserId(userId: String): List<AnnualFinancialStatement>
    fun countAllByUserIdAndYear(userId: String, year: Int): Long
    fun findByUserIdAndId(userId: String, id: Long): AnnualFinancialStatement?
}
