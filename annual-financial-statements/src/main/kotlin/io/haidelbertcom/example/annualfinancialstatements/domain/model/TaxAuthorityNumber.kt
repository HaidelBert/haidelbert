package io.haidelbertcom.example.annualfinancialstatements.domain.model

enum class TaxAuthorityNumber(val number: String) {
    REVENUE("9040"),
    REVENUE_DEPRECIATIONS("9060"),
    EXPENDITURE("9230"),
    EXPENDITURE_MARKETING("9200"),
    EXPENDITURE_TRAVELLING("9160"),
    EXPENDITURE_INSURANCE("9225"),
    EXPENDITURE_DEPRECIATIONS("9130"),
    EXPENDITURE_INTEREST_RATES("9220");

    companion object {
        fun byNumber(number: String): TaxAuthorityNumber? {
            return TaxAuthorityNumber.values().find { it.number == number }
        }
    }
}
