package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.domain.exception.ConflictException;
import java.time.LocalDate;

public interface CreatePreRegistrationStrategy {

    LocalDate getToDate();
    LocalDate getFromDate();
    void  checkExistingPreRegistration() throws ConflictException;
}
