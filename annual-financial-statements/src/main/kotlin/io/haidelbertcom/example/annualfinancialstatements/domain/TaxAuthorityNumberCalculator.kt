package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.accounting.AccountingRecord
import io.haidelbertcom.example.annualfinancialstatements.backend.accounting.Category
import io.haidelbertcom.example.annualfinancialstatements.backend.registerOfAssets.YearDepreciation
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
        Category.TAX_AUTHORITY_PAYMENT to TaxAuthorityNumber.EXPENDITURE,
        Category.SVA to TaxAuthorityNumber.EXPENDITURE_INSURANCE,
        Category.TRAVELLING to TaxAuthorityNumber.EXPENDITURE_TRAVELLING
)

class FinancialSummary(
        val sumGrossExpenditure: Long,
        val sumNetExpenditure: Long,
        val sumGrossRevenue: Long,
        val sumNetRevenue: Long,
        val result: Long
)

class FinancialAmount(var gross: Long, var net: Long)

class TaxAuthorityNumberCalculator(
        private val accountingRecords: List<AccountingRecord>,
        private val depreciations: YearDepreciation
){
    fun calculateFinancialSummary(): FinancialSummary {
        var sumGrossExpenditure: Long = depreciations.sumDepreciations
        var sumNetExpenditure: Long = depreciations.sumDepreciations
        var sumGrossRevenue: Long = 0
        var sumNetRevenue: Long = 0
        accountingRecords.forEach {
            if (it.category.revenue) {
                sumGrossRevenue+=it.grossAmount
                sumNetRevenue+=it.netAmount
            }else {
                sumGrossExpenditure+=it.grossAmount
                sumNetExpenditure+=it.netAmount
            }
        }
        return FinancialSummary(
                sumGrossExpenditure,
                sumNetExpenditure,
                sumGrossRevenue,
                sumNetRevenue,
                sumNetRevenue - sumNetExpenditure
        )
    }

    fun calculateTaxAuthorityNumbers(): MutableMap<TaxAuthorityNumber, FinancialAmount> {
        val sums: MutableMap<TaxAuthorityNumber, FinancialAmount> = mutableMapOf()
        accountingRecords.forEach {
            val mappedTaxAuthNumber = categoryMapping[it.category] ?: throw IllegalStateException()
            if (sums.containsKey(mappedTaxAuthNumber)) {
                sums[mappedTaxAuthNumber]!!.gross = sums[mappedTaxAuthNumber]!!.gross.plus(it.grossAmount)
                sums[mappedTaxAuthNumber]!!.net = sums[mappedTaxAuthNumber]!!.net.plus(it.netAmount)
            }else {
                sums[mappedTaxAuthNumber] = FinancialAmount(it.grossAmount, it.netAmount)
            }
        }
        setDepreciations(sums)

        return sums
    }

    private fun setDepreciations(sums: MutableMap<TaxAuthorityNumber, FinancialAmount>) {
        if (sums.containsKey(TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS)) {
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.gross = sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.gross.plus(depreciations.sumDepreciations)
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.net = sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.net.plus(depreciations.sumDepreciations)
        } else {
            sums[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS] = FinancialAmount(depreciations.sumDepreciations, depreciations.sumDepreciations)
        }
    }
}
