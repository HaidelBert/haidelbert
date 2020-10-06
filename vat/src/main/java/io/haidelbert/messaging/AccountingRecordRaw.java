package io.haidelbert.messaging;

import io.haidelbert.backends.accounting.Category;
import io.haidelbert.backends.accounting.ReceiptType;

public class AccountingRecordRaw {
    private Long id;
    private Long runningNumber;
    private Long bookingDate;
    private String name;
    private Long grossAmount;
    private Integer taxRate;
    private ReceiptType receiptType;
    private Category category;
    private boolean reverseCharge;
}
