package io.haidelbert.domain.create;

import io.haidelbert.domain.UserContext;
import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.model.CreatePreRegistration;
import io.haidelbert.persistence.PreRegistration;

import java.time.LocalDate;
import java.util.List;

public class MonthCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final CreatePreRegistration create;
    private final UserContext context;
    private final AccountingClient accountingClient;

    public MonthCreatePreRegistrationStrategy(CreatePreRegistration create, UserContext context, AccountingClient accountingClient) {
        this.create = create;
        this.context = context;
        this.accountingClient = accountingClient;
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
        if (PreRegistration.countByQuarter(create.getYear(), create.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
    }

    @Override
    public List<AccountingRecord> listRecords() {
        return accountingClient.listByMonth(context.getAuthHeader(), create.getYear(), create.getIntervalValue());
    }

    private LocalDate getMonthStart() {
        LocalDate initial = LocalDate.of(create.getYear(), create.getIntervalValue(), 1);
        return initial.withDayOfMonth(1);
    }

    private LocalDate getMonthEnd() {
        LocalDate initial = LocalDate.of(create.getYear(), create.getIntervalValue(), 1);
        return initial.withDayOfMonth(initial.lengthOfMonth());
    }
}
