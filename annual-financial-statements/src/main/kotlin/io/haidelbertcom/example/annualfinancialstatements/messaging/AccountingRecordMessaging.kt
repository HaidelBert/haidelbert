package io.haidelbertcom.example.annualfinancialstatements.messaging

import io.haidelbertcom.example.annualfinancialstatements.backend.Category
import io.haidelbertcom.example.annualfinancialstatements.backend.ReceiptType

class AccountingRecordMessaging {
    var id: Long? = null
    var runningNumber: Long? = null
    var bookingDate: Long? = null
    var name: String? = null
    var grossAmount: Long? = null
    var taxRate: Int? = null
    var receiptType: ReceiptType? = null
    var category: Category? = null
    var isReverseCharge = false
    var userId: String? = null
}
