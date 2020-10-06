package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.domain.UserContext;
import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.persistence.PreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import java.time.LocalDate;
import java.util.List;

public class MonthCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final TimeConstraints timeConstrains;
    private final UserContext context;
    private final AccountingClient accountingClient;
    private final PreRegistrationRepository repository;

    public MonthCreatePreRegistrationStrategy(TimeConstraints timeConstrains, UserContext context, AccountingClient accountingClient, PreRegistrationRepository repository) {
        this.timeConstrains = timeConstrains;
        this.context = context;
        this.accountingClient = accountingClient;
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

    @Override
    public List<AccountingRecord> listRecords() {
        return accountingClient.listByMonth(context.getAuthHeader(), timeConstrains.getYear(), timeConstrains.getIntervalValue());
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
