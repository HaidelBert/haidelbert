package io.haidelbert.domain;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.create.CreatePreRegistrationFactory;
import io.haidelbert.domain.model.CreatePreRegistration;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistration;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;


@ApplicationScoped
public class Service {

    private final CreatePreRegistrationFactory createPreRegistrationFactory;

    public Service(CreatePreRegistrationFactory createPreRegistrationFactory) {
        this.createPreRegistrationFactory = createPreRegistrationFactory;
    }

    @Transactional
    public void addPreRegistration(UserContext context, CreatePreRegistration create) {
        var createStrategy = createPreRegistrationFactory.createStrategy(create, context);
        createStrategy.checkExistingPreRegistration();
        List<AccountingRecord> records = createStrategy.listRecords();
        var calculator = new TaxCalculator(records);

        var builder = PreRegistration.builder()
                .grossRevenue(calculator.sumGrossRevenue())
                .grossExpenditure(calculator.sumGrossExpenditures())
                .vat(calculator.calculateVat())
                .inputTax(calculator.calculateInputTax())
                .vtPayable(calculator.calculateVatPayable())
                .from(createStrategy.getFromDate())
                .to(createStrategy.getToDate())
                .reverseCharge(calculator.sumReverseCharge())
                .year(create.getYear());
        if (create.getInterval().equals(Interval.QUARTER)) {
            builder.quarter(create.getIntervalValue());
        } else {
            builder.month(create.getIntervalValue());
        }

        var newPreRegistration = builder.build();
        newPreRegistration.persistAndFlush();
    }
}
