package io.haidelbert.domain.annualCompletion.model;


public class SimulatedAnnualCompletion {
    private Long grossRevenue;
    private Long grossExpenditure;
    private Long vat;
    private Long inputTax;
    private Long reverseCharge;
    private Long vatPayable;

    public SimulatedAnnualCompletion(Long grossRevenue, Long grossExpenditure, Long vat, Long inputTax, Long reverseCharge, Long vatPayable) {
        this.grossRevenue = grossRevenue;
        this.grossExpenditure = grossExpenditure;
        this.vat = vat;
        this.inputTax = inputTax;
        this.reverseCharge = reverseCharge;
        this.vatPayable = vatPayable;
    }

    public Long getGrossRevenue() {
        return grossRevenue;
    }

    public void setGrossRevenue(Long grossRevenue) {
        this.grossRevenue = grossRevenue;
    }

    public Long getGrossExpenditure() {
        return grossExpenditure;
    }

    public void setGrossExpenditure(Long grossExpenditure) {
        this.grossExpenditure = grossExpenditure;
    }

    public Long getVat() {
        return vat;
    }

    public void setVat(Long vat) {
        this.vat = vat;
    }

    public Long getInputTax() {
        return inputTax;
    }

    public void setInputTax(Long inputTax) {
        this.inputTax = inputTax;
    }

    public Long getReverseCharge() {
        return reverseCharge;
    }

    public void setReverseCharge(Long reverseCharge) {
        this.reverseCharge = reverseCharge;
    }

    public Long getVatPayable() {
        return vatPayable;
    }

    public void setVatPayable(Long vatPayable) {
        this.vatPayable = vatPayable;
    }
}
