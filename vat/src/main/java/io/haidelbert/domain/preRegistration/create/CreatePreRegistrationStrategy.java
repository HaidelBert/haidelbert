package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.exception.ConflictException;

import java.time.LocalDate;
import java.util.List;

public interface CreatePreRegistrationStrategy {

    LocalDate getToDate();
    LocalDate getFromDate();
    void  checkExistingPreRegistration() throws ConflictException;
    List<AccountingRecord> listRecords();
}
