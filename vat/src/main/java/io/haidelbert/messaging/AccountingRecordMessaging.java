package io.haidelbert.messaging;

import io.haidelbert.backends.accounting.Category;
import io.haidelbert.backends.accounting.ReceiptType;

public class AccountingRecordMessaging {
    private Long id;
    private Long runningNumber;
    private Long bookingDate;
    private String name;
    private Long grossAmount;
    private Integer taxRate;
    private ReceiptType receiptType;
    private Category category;
    private boolean reverseCharge;
    private String userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getRunningNumber() {
        return runningNumber;
    }

    public void setRunningNumber(Long runningNumber) {
        this.runningNumber = runningNumber;
    }

    public Long getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Long bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getGrossAmount() {
        return grossAmount;
    }

    public void setGrossAmount(Long grossAmount) {
        this.grossAmount = grossAmount;
    }

    public Integer getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(Integer taxRate) {
        this.taxRate = taxRate;
    }

    public ReceiptType getReceiptType() {
        return receiptType;
    }

    public void setReceiptType(ReceiptType receiptType) {
        this.receiptType = receiptType;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isReverseCharge() {
        return reverseCharge;
    }

    public void setReverseCharge(boolean reverseCharge) {
        this.reverseCharge = reverseCharge;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
