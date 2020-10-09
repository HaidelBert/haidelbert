package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.AccountingRecord
import io.haidelbertcom.example.annualfinancialstatements.backend.Category
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
        Category.REVENUE_SERVICES to TaxAuthorityNumber.REVENUE
)

class FinancialSummary(
        val sumGrossExpenditure: Long,
        val sumNetExpenditure: Long,
        val sumGrossRevenue: Long,
        val sumNetRevenue: Long
)

class FinancialAmount(var gross: Long, var net: BigDecimal)

class TaxAuthorityNumberCalculator(private val accountingRecords: List<AccountingRecord>){

    fun calculateFinancialSummary(): FinancialSummary {
        var sumGrossExpenditure: Long = 0
        var sumNetExpenditure = BigDecimal(0)
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
                sumNetRevenue.longValueExact()
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

        return sums
    }

    private fun calculateNetAmount (accountingRecord: AccountingRecord): BigDecimal {
        val grossAmount = BigDecimal(accountingRecord.grossAmount)
        val ratio = BigDecimal(accountingRecord.taxRate + 100).divide(BigDecimal(100))
        return grossAmount.subtract(grossAmount.divide(ratio, RoundingMode.HALF_EVEN))
    }
}
