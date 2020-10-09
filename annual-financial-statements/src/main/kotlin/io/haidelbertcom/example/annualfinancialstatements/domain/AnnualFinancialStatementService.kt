package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingClient
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatementRepository
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPosition
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPositionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.math.roundToLong

@Service
class AnnualFinancialStatementService(
        private val annualFinancialStatementRepository: AnnualFinancialStatementRepository,
        private val accountingClient: AccountingClient,
        private val taxAuthorityPositionRepository: TaxAuthorityPositionRepository
) {

    @Transactional(readOnly = true)
    fun list(userId: String): List<AnnualFinancialStatement> {
        return annualFinancialStatementRepository.findByUserId(userId)
    }

    @Transactional
    fun add(userId: String, year: Int): AnnualFinancialStatement {
        var accountingRecords = accountingClient.listInternal(userId, year)
        var newStatement = AnnualFinancialStatement(
                year = year,
                result = 0,
                sumGrossExpenditure = 0,
                sumGrossRevenue = 0,
                sumNetExpenditure = 0,
                sumNetRevenue = 0,
                userId = userId
        )
        annualFinancialStatementRepository.save(newStatement)


        val calculator = TaxAuthorityNumberCalculator(accountingRecords)
        val sums = calculator.calculateTaxAuthorityNumbers()
        val financialSummary = calculator.calculateFinancialSummary()

        sums.forEach { taxAuthNumber, sums ->
            val newTaxAuthPosition = TaxAuthorityPosition(
                    taxAuthorityNumber = taxAuthNumber.number,
                    annualFinancialStatement = newStatement,
                    grossAmunt = sums.gross,
                    netAmount = sums.net.longValueExact()
            )
            taxAuthorityPositionRepository.save(newTaxAuthPosition)
        }
        newStatement.sumGrossExpenditure = financialSummary.sumGrossExpenditure
        newStatement.sumNetExpenditure = financialSummary.sumNetExpenditure
        newStatement.sumGrossRevenue = financialSummary.sumGrossRevenue
        newStatement.sumNetRevenue = financialSummary.sumNetRevenue
        newStatement.result = financialSummary.sumGrossRevenue - financialSummary.sumGrossRevenue


        return annualFinancialStatementRepository.save(newStatement)
    }


}
