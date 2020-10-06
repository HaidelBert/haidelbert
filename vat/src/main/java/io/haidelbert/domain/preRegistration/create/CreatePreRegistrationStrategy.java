package io.haidelbert.domain.create;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.model.CreatePreRegistration;

import java.time.LocalDate;
import java.util.List;

public interface CreatePreRegistrationStrategy {

    LocalDate getToDate();
    LocalDate getFromDate();
    void  checkExistingPreRegistration() throws ConflictException;
    List<AccountingRecord> listRecords();
}
