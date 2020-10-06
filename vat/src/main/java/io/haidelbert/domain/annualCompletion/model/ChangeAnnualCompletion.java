package io.haidelbert.domain.annualCompletion.model;

public class ChangeAnnualCompletion {
    private boolean taxAuthoritySubmitted;

    public ChangeAnnualCompletion() {
    }

    public ChangeAnnualCompletion(boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }

    public boolean isTaxAuthoritySubmitted() {
        return taxAuthoritySubmitted;
    }

    public void setTaxAuthoritySubmitted(boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }
}
