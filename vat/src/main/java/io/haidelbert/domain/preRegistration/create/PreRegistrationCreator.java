package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.backends.accounting.AccountingClientService;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.preRegistration.TaxCalculator;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class PreRegistrationCreator {
    private final PreRegistrationRepository repository;
    private final AccountingClientService accountingClientService;

    public PreRegistrationCreator(PreRegistrationRepository repository, AccountingClientService accountingClientService) {
        this.repository = repository;
        this.accountingClientService = accountingClientService;
    }

    public PreRegistration create(UserContext context, CreatePreRegistration create) {
        var timeConstrainedStrategy = createStrategy(context, create);
        timeConstrainedStrategy.checkExistingPreRegistration();
        List<AccountingRecord> records = timeConstrainedStrategy.listAccountingRecords();
        var calculator = new TaxCalculator(records);

        var newPreRegistration = buildInstance(context,
                calculator,
                timeConstrainedStrategy.getFromDate(),
                timeConstrainedStrategy.getToDate(),
                create);

        repository.persistAndFlush(newPreRegistration);

        return newPreRegistration;
    }

    private PreRegistration buildInstance(UserContext context, TaxCalculator calc, LocalDate fromDate, LocalDate toDate, CreatePreRegistration create) {
        return new PreRegistration(
                calc.sumGrossRevenue(),
                calc.sumGrossExpenditures(),
                calc.calculateVat(),
                calc.calculateInputTax(),
                calc.sumReverseCharge(),
                calc.calculateVatPayable(),
                fromDate,
                toDate,
                create.getYear(),
                create.getInterval().equals(Interval.QUARTER) ? create.getIntervalValue() : null,
                create.getInterval().equals(Interval.MONTH) ? create.getIntervalValue() : null,
                context.getUserId(),
                create.getInterval(),
                create.getTaxAuthoritySubmitted()
        );
    }

    private CreatePreRegistrationStrategy createStrategy(UserContext context, CreatePreRegistration create) {
        if (create.getInterval().equals(Interval.QUARTER)) {
            return new QuarterCreatePreRegistrationStrategy(create, context, repository, accountingClientService);
        }
        return new MonthCreatePreRegistrationStrategy(create, context, repository, accountingClientService);
    }
}
