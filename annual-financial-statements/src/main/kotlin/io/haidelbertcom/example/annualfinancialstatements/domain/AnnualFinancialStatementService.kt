package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingClient
import io.haidelbertcom.example.annualfinancialstatements.backend.RegisterOfAssetsClient
import io.haidelbertcom.example.annualfinancialstatements.domain.exception.ConflictException
import io.haidelbertcom.example.annualfinancialstatements.domain.exception.NotFoundException
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementModel
import io.haidelbertcom.example.annualfinancialstatements.domain.model.AnnualFinancialStatementSimulation
import io.haidelbertcom.example.annualfinancialstatements.domain.model.ChangeAnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.domain.model.FinalFinancialAmount
import io.haidelbertcom.example.annualfinancialstatements.messaging.AccountingRecordMessaging
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatement
import io.haidelbertcom.example.annualfinancialstatements.persistence.AnnualFinancialStatementRepository
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPosition
import io.haidelbertcom.example.annualfinancialstatements.persistence.TaxAuthorityPositionRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.time.LocalDateTime
import java.time.ZoneOffset
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
        return executeAnnualFinancialStatement(newStatement, userId, year)
    }

    private fun executeAnnualFinancialStatement(statement: AnnualFinancialStatement, userId: String, year: Int): AnnualFinancialStatementModel {
        val accountingRecords = accountingClient.listInternal(userId, year)
        val depreciations = registerOfAssetsClient.getYearDepreciationInternal(userId, year)
                ?: throw NotFoundException("Anlagenverzeichnis wurde noch nicht abgeschlossen")


        val calculator = TaxAuthorityNumberCalculator(accountingRecords, depreciations)
        val sums = calculator.calculateTaxAuthorityNumbers()
        val financialSummary = calculator.calculateFinancialSummary()

        sums.forEach { taxAuthNumber, sums ->
            val newTaxAuthPosition = TaxAuthorityPosition(
                    taxAuthorityNumber = taxAuthNumber.number,
                    annualFinancialStatement = statement,
                    grossAmunt = sums.gross,
                    netAmount = sums.net.longValueExact()
            )
            taxAuthorityPositionRepository.save(newTaxAuthPosition)
        }
        statement.sumGrossExpenditure = financialSummary.sumGrossExpenditure
        statement.sumNetExpenditure = financialSummary.sumNetExpenditure
        statement.sumGrossRevenue = financialSummary.sumGrossRevenue
        statement.sumNetRevenue = financialSummary.sumNetRevenue
        statement.result = financialSummary.result


        annualFinancialStatementRepository.save(statement)

        return AnnualFinancialStatementModel(
                statement.id,
                statement.year,
                statement.sumGrossExpenditure,
                statement.sumNetExpenditure,
                statement.sumGrossRevenue,
                statement.sumNetRevenue,
                statement.result,
                statement.taxAuthorityPositions.associateBy(
                        { it.taxAuthorityNumber }, { FinalFinancialAmount(it.grossAmunt, it.netAmount) }
                ),
                userId,
                statement.taxAuthoritySubmitted
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

    @Transactional
    fun handleAccountingRecordModified(message: AccountingRecordMessaging) {
        val year = LocalDateTime.ofEpochSecond(message.bookingDate!!, 0, ZoneOffset.UTC).toLocalDate().year
        val existingStatement = this.annualFinancialStatementRepository.findByUserIdAndYear(message.userId!!, year)
        if (existingStatement == null) {
            return;
        }
        executeAnnualFinancialStatement(existingStatement!!, message.userId!!, existingStatement.year)
    }
}
