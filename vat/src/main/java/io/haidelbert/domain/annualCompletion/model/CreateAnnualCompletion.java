package io.haidelbert.domain.annualCompletion.model;

import io.haidelbert.persistence.Interval;

public class CreateAnnualCompletion {
    private Integer year;
    private Boolean taxAuthoritySubmitted;

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Boolean getTaxAuthoritySubmitted() {
        return taxAuthoritySubmitted;
    }

    public void setTaxAuthoritySubmitted(Boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }
}
