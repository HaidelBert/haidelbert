package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.domain.AuthContext;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.persistence.PreRegistrationRepository;

import java.time.LocalDate;

public class MonthCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final TimeConstraints timeConstrains;
    private final AuthContext context;
    private final PreRegistrationRepository repository;

    public MonthCreatePreRegistrationStrategy(TimeConstraints timeConstrains, AuthContext context, PreRegistrationRepository repository) {
        this.timeConstrains = timeConstrains;
        this.context = context;
        this.repository = repository;
    }

    @Override
    public LocalDate getToDate() {
        return getMonthEnd();
    }

    @Override
    public LocalDate getFromDate() {
        return getMonthStart();
    }

    @Override
    public void checkExistingPreRegistration() throws ConflictException {
        if (repository.countByQuarter(timeConstrains.getYear(), timeConstrains.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
    }

    private LocalDate getMonthStart() {
        LocalDate initial = LocalDate.of(timeConstrains.getYear(), timeConstrains.getIntervalValue(), 1);
        return initial.withDayOfMonth(1);
    }

    private LocalDate getMonthEnd() {
        LocalDate initial = LocalDate.of(timeConstrains.getYear(), timeConstrains.getIntervalValue(), 1);
        return initial.withDayOfMonth(initial.lengthOfMonth());
    }
}
