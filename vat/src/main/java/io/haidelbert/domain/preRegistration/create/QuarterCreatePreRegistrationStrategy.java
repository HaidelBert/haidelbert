package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.backends.accounting.AccountingClientService;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

import static java.time.temporal.IsoFields.QUARTER_OF_YEAR;

public class QuarterCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final CreatePreRegistration create;
    private final UserContext context;
    private final PreRegistrationRepository repository;
    private final AccountingClientService accountingClientService;

    public QuarterCreatePreRegistrationStrategy(CreatePreRegistration create,
                                                UserContext context,
                                                PreRegistrationRepository repository,
                                                AccountingClientService accountingClientService) {
        this.create = create;
        this.context = context;
        this.repository = repository;
        this.accountingClientService = accountingClientService;
    }

    @Override
    public List<AccountingRecord> listAccountingRecords() {
        return accountingClientService.listByQuarter(context, create.getYear(), create.getIntervalValue());
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
        if (repository.countByQuarter(create.getYear(), create.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
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
