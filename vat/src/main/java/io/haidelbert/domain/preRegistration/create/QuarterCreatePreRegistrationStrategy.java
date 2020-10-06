package io.haidelbert.domain.create;

import io.haidelbert.domain.UserContext;
import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.model.CreatePreRegistration;
import io.haidelbert.persistence.PreRegistration;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import static java.time.temporal.IsoFields.QUARTER_OF_YEAR;

public class QuarterCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final CreatePreRegistration create;
    private final UserContext context;
    private final AccountingClient accountingClient;

    public QuarterCreatePreRegistrationStrategy(CreatePreRegistration create, UserContext context, AccountingClient accountingClient) {
        this.create = create;
        this.context = context;
        this.accountingClient = accountingClient;
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
        if (PreRegistration.countByQuarter(create.getYear(), create.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
    }

    @Override
    public List<AccountingRecord> listRecords() {
        return accountingClient.listByQuarter(context.getAuthHeader(), create.getYear(), create.getIntervalValue());
    }

    private LocalDate getQuarterStart() {
        return YearMonth.of(create.getYear(), 1)
                .with(QUARTER_OF_YEAR, create.getIntervalValue())
                .atDay(1);
    }

    private LocalDate getQuarterEnd() {
        return YearMonth.of(create.getYear(), 3)
                .with(QUARTER_OF_YEAR, create.getIntervalValue())
                .atEndOfMonth();
    }
}
