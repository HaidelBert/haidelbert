package io.haidelbert.domain.preRegistration.model;

public class ChangePreRegistration {
    private boolean taxAuthoritySubmitted;

    public ChangePreRegistration() {
    }

    public ChangePreRegistration(boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }

    public boolean isTaxAuthoritySubmitted() {
        return taxAuthoritySubmitted;
    }

    public void setTaxAuthoritySubmitted(boolean taxAuthoritySubmitted) {
        this.taxAuthoritySubmitted = taxAuthoritySubmitted;
    }
}
