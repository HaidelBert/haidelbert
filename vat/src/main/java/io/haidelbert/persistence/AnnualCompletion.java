package io.haidelbert.persistence;

import io.haidelbert.domain.model.FinancialData;

import javax.persistence.*;

@Entity(name = "annual_completions")
public class AnnualCompletion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "gross_revenue")
    private Long grossRevenue;
    @Column(name = "gross_expenditure")
    private Long grossExpenditure;
    @Column(name = "vat")
    private Long vat;
    @Column(name = "input_tax")
    private Long inputTax;
    @Column(name = "reverse_charge")
    private Long reverseCharge;
    @Column(name = "vat_payable")
    private Long vatPayable;
    @Column(name = "year")
    private Integer year;
    @Column(name = "id_user")
    private String userId;
    @Column(name = "tax_authority_submitted")
    private boolean taxAuthoritySubmitted;

    public AnnualCompletion() {
    }

    public AnnualCompletion(Long grossRevenue, Long grossExpenditure, Long vat, Long inputTax, Long reverseCharge, Long vatPayable, Integer year, String userId, boolean taxAuthoritySubmitted) {
        this.grossRevenue = grossRevenue;
        this.grossExpenditure = grossExpenditure;
        this.vat = vat;
        this.inputTax = inputTax;
        this.reverseCharge = reverseCharge;
        this.vatPayable = vatPayable;
        this.year = year;
        this.userId = userId;
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }

    public AnnualCompletion(FinancialData financialData, Integer year, String userId, boolean taxAuthoritySubmitted) {
        this.grossRevenue = financialData.getGrossRevenue();
        this.grossExpenditure = financialData.getGrossExpenditure();
        this.vat = financialData.getVat();
        this.inputTax = financialData.getInputTax();
        this.reverseCharge = financialData.getReverseCharge();
        this.vatPayable = financialData.getVatPayable();
        this.year = year;
        this.userId = userId;
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public boolean isTaxAuthoritySubmitted() {
        return taxAuthoritySubmitted;
    }

    public void setTaxAuthoritySubmitted(boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }
}
