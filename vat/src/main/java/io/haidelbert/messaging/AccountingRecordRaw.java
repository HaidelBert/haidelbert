package io.haidelbert.messaging;

import io.haidelbert.domain.Category;
import io.haidelbert.domain.ReceiptType;

import java.time.LocalDate;

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
