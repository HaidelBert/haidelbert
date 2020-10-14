package io.haidelbertcom.example.annualfinancialstatements.backend.accounting

enum class ReceiptType {
    CASH, BANK
}

enum class Category(val revenue: Boolean = false) {
    TAX_AUTHORITY_PAYMENT,
    OFFICE_EXPENDITURE,
    MARKETING,
    TRAVELLING,
    POST_PHONE,
    TRAINING,
    MISC_EXPENDITURE,
    SVA,
    THIRD_PARTY_SERVICES,
    OFFICE_MATERIALS,
    GWG,
    INTEREST_CHARGES,
    INSURANCE,
    LITERATURE,
    REVENUE_SERVICES(true),
    REVENUE_DEPRECIATIONS(true)
}

data class AccountingRecord(
        val id: Long,
        val runningNumber: Long,
        val bookingDate: Long,
        val name: String,
        val grossAmount: Long,
        val taxRate: Long,
        val receiptType: ReceiptType,
        val category: Category,
        val reverseCharge: Boolean,
        val userId: String
)
