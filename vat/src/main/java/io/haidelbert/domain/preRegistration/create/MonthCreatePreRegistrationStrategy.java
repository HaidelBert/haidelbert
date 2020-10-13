package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.backends.accounting.AccountingClientService;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import java.time.LocalDate;
import java.util.List;

public class MonthCreatePreRegistrationStrategy implements CreatePreRegistrationStrategy {

    private final CreatePreRegistration create;
    private final UserContext context;
    private final PreRegistrationRepository repository;
    private final AccountingClientService accountingClientService;

    public MonthCreatePreRegistrationStrategy(CreatePreRegistration create,
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
        return accountingClientService.listByMonth(context, create.getYear(), create.getIntervalValue());
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
        if (repository.countByQuarter(context.getUserId(), create.getYear(), create.getIntervalValue()) > 0) {
            throw new ConflictException("Pre registration already exists");
        }
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
