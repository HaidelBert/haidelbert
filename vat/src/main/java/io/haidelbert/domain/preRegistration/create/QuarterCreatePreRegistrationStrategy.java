package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.domain.AuthContext;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.persistence.PreRegistrationRepository;

import java.time.LocalDate;
import java.time.YearMonth;

import static java.time.temporal.IsoFields.QUARTER_OF_YEAR;

public class QuarterCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final TimeConstraints timeConstrains;
    private final AuthContext context;
    private final PreRegistrationRepository repository;

    public QuarterCreatePreRegistrationStrategy(TimeConstraints timeConstrains, AuthContext context, PreRegistrationRepository repository) {
        this.timeConstrains = timeConstrains;
        this.context = context;
        this.repository = repository;
    }

    @Override
    public LocalDate getToDate() {
        return getQuarterEnd();
    }

    @Override
    public LocalDate getFromDate() {
        return getQuarterStart();
    }

    @Override
    public void checkExistingPreRegistration() throws ConflictException {
        if (repository.countByQuarter(timeConstrains.getYear(), timeConstrains.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
    }

    private LocalDate getQuarterStart() {
        return YearMonth.of(timeConstrains.getYear(), 1)
                .with(QUARTER_OF_YEAR, timeConstrains.getIntervalValue())
                .atDay(1);
    }

    private LocalDate getQuarterEnd() {
        return YearMonth.of(timeConstrains.getYear(), 3)
                .with(QUARTER_OF_YEAR, timeConstrains.getIntervalValue())
                .atEndOfMonth();
    }
}
