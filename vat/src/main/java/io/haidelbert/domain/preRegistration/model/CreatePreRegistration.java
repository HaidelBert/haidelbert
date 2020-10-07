package io.haidelbert.domain.preRegistration.model;

import io.haidelbert.persistence.Interval;

public class CreatePreRegistration {
    private Integer year;
    private Interval interval;
    private Integer intervalValue;
    private Boolean taxAuthoritySubmitted;

    public CreatePreRegistration() {
    }

    public CreatePreRegistration(Integer year, Interval interval, Integer intervalValue, Boolean taxAuthoritySubmitted) {
        this.year = year;
        this.interval = interval;
        this.intervalValue = intervalValue;
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }

    public Integer getIntervalValue() {
        return intervalValue;
    }

    public void setIntervalValue(Integer intervalValue) {
        this.intervalValue = intervalValue;
    }

    public Boolean getTaxAuthoritySubmitted() {
        return taxAuthoritySubmitted;
    }

    public void setTaxAuthoritySubmitted(Boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }
}
