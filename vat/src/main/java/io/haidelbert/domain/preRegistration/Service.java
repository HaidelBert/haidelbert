package io.haidelbert.domain.preRegistration;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.model.FinancialData;
import io.haidelbert.domain.preRegistration.create.CreatePreRegistrationFactory;
import io.haidelbert.domain.preRegistration.model.ChangePreRegistration;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.domain.preRegistration.model.SimulatePreRegistration;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class Service {

    private final CreatePreRegistrationFactory createPreRegistrationFactory;
    private final PreRegistrationRepository repository;

    public Service(CreatePreRegistrationFactory createPreRegistrationFactory, PreRegistrationRepository repository) {
        this.createPreRegistrationFactory = createPreRegistrationFactory;
        this.repository = repository;
    }

    @Transactional
    public PreRegistration addPreRegistration(UserContext context, CreatePreRegistration create) {
        var createStrategy = createPreRegistrationFactory.createStrategy(create, context);
        createStrategy.checkExistingPreRegistration();
        List<AccountingRecord> records = createStrategy.listRecords();
        var calculator = new TaxCalculator(records);

        var newPreRegistration = new PreRegistration(
                calculator.sumGrossRevenue(),
                calculator.sumGrossExpenditures(),
                calculator.calculateVat(),
                calculator.calculateInputTax(),
                calculator.sumReverseCharge(),
                calculator.calculateVatPayable(),
                createStrategy.getFromDate(),
                createStrategy.getToDate(),
                create.getYear(),
                create.getInterval().equals(Interval.QUARTER) ? create.getIntervalValue() : null,
                create.getInterval().equals(Interval.MONTH) ? create.getIntervalValue() : null,
                context.getUserId(),
                create.getInterval(),
                create.getTaxAuthoritySubmitted()
        );

        repository.persistAndFlush(newPreRegistration);

        return newPreRegistration;
    }

    @Transactional
    public List<PreRegistration> listPreRegistrations(UserContext context, int year) {
        return repository.list("userId=?1 and year=?2", context.getUserId(), year);
    }

    @Transactional
    public List<Integer> listDistinctYears(UserContext context) {
        return repository.findDistinctYears(context.getUserId());
    }

    @Transactional
    public void change(UserContext context, Long id, ChangePreRegistration change) {
        var preRegistration = repository.findById(id);
        preRegistration.setTaxAuthoritySubmitted(change.isTaxAuthoritySubmitted());
    }

    @Transactional
    public FinancialData simulate(UserContext context, SimulatePreRegistration simulate) {
        var createStrategy = createPreRegistrationFactory.createStrategy(simulate, context);
        List<AccountingRecord> records = createStrategy.listRecords();
        var calculator = new TaxCalculator(records);

        return new FinancialData(
                calculator.sumGrossRevenue(),
                calculator.sumGrossExpenditures(),
                calculator.calculateVat(),
                calculator.calculateInputTax(),
                calculator.sumReverseCharge(),
                calculator.calculateVatPayable());
    }
}
