package io.haidelbert.domain;

import java.time.LocalDate;

public class AccountingRecord {
    private Long id;
    private Long runningNumber;
    private LocalDate bookingDate;
    private String name;
    private Long grossAmount;
    private Integer taxRate;
    private ReceiptType receiptType;
    private Category category;
    private boolean reverseCharge;

    public AccountingRecord() {
    }

    public AccountingRecord(Long id,
                            Long runningNumber,
                            LocalDate bookingDate,
                            String name,
                            Long grossAmount,
                            Integer taxRate,
                            ReceiptType receiptType,
                            Category category,
                            boolean reverseCharge) {
        this.id = id;
        this.runningNumber = runningNumber;
        this.bookingDate = bookingDate;
        this.name = name;
        this.grossAmount = grossAmount;
        this.taxRate = taxRate;
        this.receiptType = receiptType;
        this.category = category;
        this.reverseCharge = reverseCharge;
    }

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

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
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
}
