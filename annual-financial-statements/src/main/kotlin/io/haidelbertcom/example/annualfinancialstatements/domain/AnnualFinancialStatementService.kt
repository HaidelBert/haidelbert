package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingClient
import io.haidelbertcom.example.annualfinancialstatements.backend.RegisterOfAssetsClient
import io.haidelbertcom.example.annualfinancialstatements.domain.exception.ConflictException
import io.haidelbertcom.example.annualfinancialstatements.domain.exception.NotFoundException
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementModel
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementSimulation
import io.haidelbertcom.example.annualfinancialstatements.domain.model.ChangeAnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.domain.model.FinalFinancialAmount
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatementRepository
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPosition
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPositionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import kotlin.streams.toList

@Service
class AnnualFinancialStatementService(
        private val annualFinancialStatementRepository: AnnualFinancialStatementRepository,
        private val accountingClient: AccountingClient,
        private val taxAuthorityPositionRepository: TaxAuthorityPositionRepository,
        private val registerOfAssetsClient: RegisterOfAssetsClient
) {
    @Transactional(readOnly = true)
    fun list(userId: String): List<AnnualFinancialStatementModel> {
        return annualFinancialStatementRepository.findByUserId(userId)
                .stream()
                .map {
                    AnnualFinancialStatementModel(
                            it.id,
                            it.year,
                            it.sumGrossExpenditure,
                            it.sumNetExpenditure,
                            it.sumGrossRevenue,
                            it.sumNetRevenue,
                            it.result,
                            it.taxAuthorityPositions.associateBy(
                                    { it.taxAuthorityNumber }, { FinalFinancialAmount(it.grossAmunt, it.netAmount) }
                            ),
                            userId,
                            it.taxAuthoritySubmitted
                    )
                }
                .toList()

    }

    @Transactional
    fun add(userId: String, year: Int): AnnualFinancialStatementModel {
        if (annualFinancialStatementRepository.countAllByUserIdAndYear(userId, year) > 0) {
            throw ConflictException("Erklärung für das Jahr $year existiert bereits")
        }
        val accountingRecords = accountingClient.listInternal(userId, year)
        val depreciations = registerOfAssetsClient.getYearDepreciationInternal(userId, year)
                ?: throw NotFoundException("Anlagenverzeichnis wurde noch nicht abgeschlossen")
        var newStatement = AnnualFinancialStatement(
                year = year,
                result = 0,
                sumGrossExpenditure = 0,
                sumGrossRevenue = 0,
                sumNetExpenditure = 0,
                sumNetRevenue = 0,
                userId = userId,
                taxAuthorityPositions = mutableListOf()
        )
        annualFinancialStatementRepository.save(newStatement)


        val calculator = TaxAuthorityNumberCalculator(accountingRecords, depreciations)
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
        newStatement.result = financialSummary.result


        newStatement = annualFinancialStatementRepository.save(newStatement)

       return AnnualFinancialStatementModel(
               newStatement.id,
               newStatement.year,
               newStatement.sumGrossExpenditure,
               newStatement.sumNetExpenditure,
               newStatement.sumGrossRevenue,
               newStatement.sumNetRevenue,
               newStatement.result,
               newStatement.taxAuthorityPositions.associateBy(
                       { it.taxAuthorityNumber }, { FinalFinancialAmount(it.grossAmunt, it.netAmount) }
               ),
               userId,
               newStatement.taxAuthoritySubmitted
       )
    }

    @Transactional
    fun simulate(userId: String, year: Int): AnnualFinancialStatementSimulation {
        val accountingRecords = accountingClient.listInternal(userId, year)
        val depreciations = registerOfAssetsClient.getYearDepreciationInternal(userId, year)
                ?: throw NotFoundException("Anlagenverzeichnis wurde noch nicht abgeschlossen")
        val calculator = TaxAuthorityNumberCalculator(accountingRecords, depreciations)
        val sums = calculator.calculateTaxAuthorityNumbers()
        val financialSummary = calculator.calculateFinancialSummary()

        return AnnualFinancialStatementSimulation(
                financialSummary.sumGrossExpenditure,
                financialSummary.sumNetExpenditure,
                financialSummary.sumGrossRevenue,
                financialSummary.sumNetRevenue,
                financialSummary.result,
                sums.entries.associate { it.key.number to FinalFinancialAmount(it.value.gross, it.value.net.longValueExact())}
        )
    }

    @Transactional
    fun change(userId: String, id: Long, patch: ChangeAnnualFinancialStatement): Unit {
        val existing: AnnualFinancialStatement? = annualFinancialStatementRepository.findByUserIdAndId(userId, id)
                ?: throw NotFoundException("Could not find Jahresabschluss")
        existing!!.taxAuthoritySubmitted = patch.taxAuthoritySubmitted
        annualFinancialStatementRepository.save(existing)
    }
}
