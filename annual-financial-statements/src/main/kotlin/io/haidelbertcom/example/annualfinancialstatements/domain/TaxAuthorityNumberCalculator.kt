package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingRecord
import io.haidelbertcom.example.annualfinancialstatements.backend.Category
import io.haidelbertcom.example.annualfinancialstatements.backend.YearDepreciation
import io.haidelbertcom.example.annualfinancialstatements.domain.model.TaxAuthorityNumber
import java.math.BigDecimal
import java.math.RoundingMode

private val categoryMapping = mapOf(
        Category.GWG to TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS,
        Category.INSURANCE to TaxAuthorityNumber.EXPENDITURE_INSURANCE,
        Category.INTEREST_CHARGES to TaxAuthorityNumber.EXPENDITURE_INTEREST_RATES,
        Category.LITERATURE to TaxAuthorityNumber.EXPENDITURE,
        Category.MARKETING to TaxAuthorityNumber.EXPENDITURE_MARKETING,
        Category.MISC_EXPENDITURE to TaxAuthorityNumber.EXPENDITURE,
        Category.OFFICE_EXPENDITURE to TaxAuthorityNumber.EXPENDITURE,
        Category.OFFICE_MATERIALS to TaxAuthorityNumber.EXPENDITURE,
        Category.POST_PHONE to TaxAuthorityNumber.EXPENDITURE,
        Category.REVENUE_DEPRECIATIONS to TaxAuthorityNumber.REVENUE_DEPRECIATIONS,
        Category.REVENUE_SERVICES to TaxAuthorityNumber.REVENUE,
        Category.TAX_AUTHORITY_PAYMENT to TaxAuthorityNumber.EXPENDITURE
)

class FinancialSummary(
        val sumGrossExpenditure: Long,
        val sumNetExpenditure: Long,
        val sumGrossRevenue: Long,
        val sumNetRevenue: Long,
        val result: Long
)

class FinancialAmount(var gross: Long, var net: BigDecimal)

class TaxAuthorityNumberCalculator(
        private val accountingRecords: List<AccountingRecord>,
        private val depreciations: YearDepreciation
){
    fun calculateFinancialSummary(): FinancialSummary {
        var sumGrossExpenditure: Long = depreciations.sumDepreciations
        var sumNetExpenditure = BigDecimal(depreciations.sumDepreciations)
        var sumGrossRevenue: Long = 0
        var sumNetRevenue = BigDecimal(0)
        accountingRecords.forEach {
            val netAmount = calculateNetAmount(it)
            if (it.category.revenue) {
                sumGrossRevenue+=it.grossAmount
                sumNetRevenue+=netAmount
            }else {
                sumGrossExpenditure+=it.grossAmount
                sumNetExpenditure+=netAmount
            }
        }
        return FinancialSummary(
                sumGrossExpenditure,
                sumNetExpenditure.longValueExact(),
                sumGrossRevenue,
                sumNetRevenue.longValueExact(),
                sumNetRevenue.longValueExact() - sumNetExpenditure.longValueExact()
        )
    }

    fun calculateTaxAuthorityNumbers(): MutableMap<TaxAuthorityNumber, FinancialAmount> {
        val sums: MutableMap<TaxAuthorityNumber, FinancialAmount> = mutableMapOf()
        accountingRecords.forEach {
            val mappedTaxAuthNumber = categoryMapping[it.category]
            val netAmount = calculateNetAmount(it)
            if (sums.containsKey(mappedTaxAuthNumber)) {
                sums[mappedTaxAuthNumber]!!.gross = sums[mappedTaxAuthNumber]!!.gross.plus(it.grossAmount)
                sums[mappedTaxAuthNumber]!!.net = sums[mappedTaxAuthNumber]!!.net.plus(netAmount)
            }else {
                sums[mappedTaxAuthNumber!!] = FinancialAmount(it.grossAmount, netAmount)
            }
        }
        if (sums.containsKey(TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS)) {
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.gross = sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.gross.plus(depreciations.sumDepreciations)
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.net = sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.net.plus(BigDecimal(depreciations.sumDepreciations))
        } else {
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS] = FinancialAmount(depreciations.sumDepreciations, BigDecimal(depreciations.sumDepreciations))
        }

        return sums
    }

    private fun calculateNetAmount (accountingRecord: AccountingRecord): BigDecimal {
        val grossAmount = BigDecimal(accountingRecord.grossAmount)
        val ratio = BigDecimal(accountingRecord.taxRate + 100).divide(BigDecimal(100))
        return grossAmount.subtract(grossAmount.divide(ratio, RoundingMode.HALF_EVEN))
    }
}
