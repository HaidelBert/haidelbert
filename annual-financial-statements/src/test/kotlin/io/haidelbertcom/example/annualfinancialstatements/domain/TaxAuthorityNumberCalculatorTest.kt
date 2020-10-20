package io.haidelbertcom.example.annualfinancialstatements.domain

import io.haidelbertcom.example.annualfinancialstatements.backend.accounting.AccountingRecord
import io.haidelbertcom.example.annualfinancialstatements.backend.accounting.Category
import io.haidelbertcom.example.annualfinancialstatements.backend.accounting.ReceiptType
import io.haidelbertcom.example.annualfinancialstatements.backend.registerOfAssets.YearDepreciation
import io.haidelbertcom.example.annualfinancialstatements.domain.model.TaxAuthorityNumber
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

class TaxAuthorityNumberCalculatorTest {

    @Test
    fun `Test calculateFinancialSummary with an empty list`() {
        val accountingRecords = listOf<AccountingRecord>()
        val depreciations = YearDepreciation(0, 2020, 0, "")
        val sut = TaxAuthorityNumberCalculator(accountingRecords, depreciations)

        val actual = sut.calculateFinancialSummary()

        Assertions.assertEquals(0, actual.sumGrossExpenditure)
        Assertions.assertEquals(0, actual.sumNetExpenditure)
        Assertions.assertEquals(0, actual.sumGrossRevenue)
        Assertions.assertEquals(0, actual.sumNetRevenue)
    }

    @Test
    fun `Test calculateTaxAuthorityNumbers with an empty list`() {
        val accountingRecords = listOf<AccountingRecord>()
        val depreciations = YearDepreciation(0, 2020, 0, "")
        val sut = TaxAuthorityNumberCalculator(accountingRecords, depreciations)

        val actual = sut.calculateTaxAuthorityNumbers()

        Assertions.assertEquals(1, actual.size)
    }

    @Test
    fun `Test rounding of calculateFinancialSummary`() {
        val accountingRecords = listOf(
                AccountingRecord(0, 0, 0, "", 33333, 27778, 20, ReceiptType.BANK, Category.GWG, false, ""),
                AccountingRecord(0, 0, 0, "", 99999, 83333, 20, ReceiptType.BANK, Category.GWG, false, ""),
                AccountingRecord(0, 0, 0, "", 10000, 8333, 20, ReceiptType.BANK, Category.GWG, false, "")
        )
        val depreciations = YearDepreciation(0, 2020, 0, "")
        val sut = TaxAuthorityNumberCalculator(accountingRecords, depreciations)

        val actual = sut.calculateFinancialSummary()

        Assertions.assertEquals(143332, actual.sumGrossExpenditure)
        Assertions.assertEquals(119444, actual.sumNetExpenditure)
        Assertions.assertEquals(0, actual.sumGrossRevenue)
        Assertions.assertEquals(0, actual.sumNetRevenue)
    }

    @Test
    fun `Test rounding of calculateTaxAuthorityNumbers`() {
        val accountingRecords = listOf(
                AccountingRecord(0, 0, 0, "", 33333, 27778, 20, ReceiptType.BANK, Category.GWG, false, ""),
                AccountingRecord(0, 0, 0, "", 99999, 83333, 20, ReceiptType.BANK, Category.GWG, false, ""),
                AccountingRecord(0, 0, 0, "", 10000, 8333, 20, ReceiptType.BANK, Category.GWG, false, "")
        )
        val depreciations = YearDepreciation(0, 2020, 0, "")
        val sut = TaxAuthorityNumberCalculator(accountingRecords, depreciations)

        val actual = sut.calculateTaxAuthorityNumbers()

        Assertions.assertEquals(143332, actual[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.gross);
        Assertions.assertEquals(119444, actual[TaxAuthorityNumber.EXPENDITURE_DEPRECIATIONS]!!.net);
    }
}
