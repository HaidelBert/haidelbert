package io.haidelbert.persistence;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Entity(name = "pre_registrations")
public class PreRegistration {
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
    @Column(name = "from_date")
    private LocalDate from;
    @Column(name = "to_date")
    private LocalDate to;
    @Column(name = "year")
    private Integer year;
    @Column(name = "quarter")
    private Integer quarter;
    @Column(name = "month")
    private Integer month;
    @Column(name = "id_user")
    private String userId;
    @Enumerated(EnumType.STRING)
    @Column(name = "interval")
    private Interval interval;

    public PreRegistration() {
        super();
    }

    public PreRegistration(Long grossRevenue,
                           Long grossExpenditure,
                           Long vat,
                           Long inputTax,
                           Long reverseCharge,
                           Long vatPayable,
                           LocalDate from,
                           LocalDate to,
                           Integer year,
                           Integer quarter,
                           Integer month,
                           String userId,
                           Interval interval) {
        this.grossRevenue = grossRevenue;
        this.grossExpenditure = grossExpenditure;
        this.vat = vat;
        this.inputTax = inputTax;
        this.reverseCharge = reverseCharge;
        this.vatPayable = vatPayable;
        this.from = from;
        this.to = to;
        this.year = year;
        this.quarter = quarter;
        this.month = month;
        this.userId = userId;
        this.interval = interval;
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

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public LocalDate getTo() {
        return to;
    }

    public void setTo(LocalDate to) {
        this.to = to;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Integer getQuarter() {
        return quarter;
    }

    public void setQuarter(Integer quarter) {
        this.quarter = quarter;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(Integer month) {
        this.month = month;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }
}
