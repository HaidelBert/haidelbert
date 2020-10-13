package io.haidelbertcom.example.annualfinancialstatements.persistence

import org.springframework.data.jpa.repository.JpaRepository

interface AnnualFinancialStatementRepository: JpaRepository<AnnualFinancialStatement, Long> {
    fun findByUserId(userId: String): List<AnnualFinancialStatement>
    fun countAllByUserIdAndYear(userId: String, year: Int): Long
    fun findByUserIdAndId(userId: String, id: Long): AnnualFinancialStatement?
    fun findByUserIdAndYear(userId: String, year: Int): AnnualFinancialStatement?
}
