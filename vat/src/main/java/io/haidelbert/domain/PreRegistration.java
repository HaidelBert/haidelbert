package io.haidelbert.domain;

import io.quarkus.hibernate.orm.panache.PanacheEntity;

import javax.persistence.Entity;
import java.time.LocalDate;

@Entity
public class PreRegistration extends PanacheEntity {
    Long id;
    Long grossRevenue;
    Long vat;
    Long inputTax;
    Long reverseCharge;
    Long vatPayable;
    LocalDate from;
    LocalDate to;

    public PreRegistration() {
    }

    public PreRegistration(Long id,
                           Long grossRevenue,
                           Long vat,
                           Long inputTax,
                           Long reverseCharge,
                           Long vatPayable,
                           LocalDate from,
                           LocalDate to) {
        this.id = id;
        this.grossRevenue = grossRevenue;
        this.vat = vat;
        this.inputTax = inputTax;
        this.reverseCharge = reverseCharge;
        this.vatPayable = vatPayable;
        this.from = from;
        this.to = to;
    }

    public Long getGrossRevenue() {
        return grossRevenue;
    }

    public void setGrossRevenue(Long grossRevenue) {
        this.grossRevenue = grossRevenue;
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
}
