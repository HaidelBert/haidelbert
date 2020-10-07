package io.haidelbert.domain.preRegistration;

import io.haidelbert.backends.accounting.AccountingClientService;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.model.FinancialData;
import io.haidelbert.domain.preRegistration.create.PreRegistrationCreator;
import io.haidelbert.domain.preRegistration.model.ChangePreRegistration;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.domain.preRegistration.model.SimulatePreRegistration;
import io.haidelbert.messaging.AccountingRecordMessaging;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.time.*;
import java.util.List;

@ApplicationScoped
public class Service {
    private final AccountingClientService accountingClientService;
    private final PreRegistrationCreator preRegistrationCreator;
    private final PreRegistrationRepository repository;

    public Service(AccountingClientService accountingClientService, PreRegistrationCreator preRegistrationCreator, PreRegistrationRepository repository) {
        this.accountingClientService = accountingClientService;
        this.preRegistrationCreator = preRegistrationCreator;
        this.repository = repository;
    }

    @Transactional
    public PreRegistration addPreRegistration(UserContext context, CreatePreRegistration create) {
       return preRegistrationCreator.create(context, create);
    }

    @Transactional
    public List<PreRegistration> listPreRegistrations(UserContext context, int year) {
        return repository.listByUserAndYear(context.getUserId(), year);
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
        List<AccountingRecord> records;
        if (simulate.getInterval().equals(Interval.QUARTER)) {
            records = accountingClientService.listByQuarter(context, simulate.getYear(), simulate.getIntervalValue());
        } else {
            records = accountingClientService.listByMonth(context, simulate.getYear(), simulate.getIntervalValue());
        }
        var calculator = new TaxCalculator(records);

        return new FinancialData(
                calculator.sumGrossRevenue(),
                calculator.sumGrossExpenditures(),
                calculator.calculateVat(),
                calculator.calculateInputTax(),
                calculator.sumReverseCharge(),
                calculator.calculateVatPayable());
    }

    @Transactional
    public void onNewAccountingRecord(AccountingRecordMessaging recordMessaging) {
        var preRegistrations = repository.listByBookingDate(LocalDateTime.ofEpochSecond(recordMessaging.getBookingDate(), 0, ZoneOffset.UTC).toLocalDate());


         preRegistrations.forEach(preRegistration -> {
            List<AccountingRecord> records;
             if (preRegistration.getInterval().equals(Interval.QUARTER)) {
                 records = accountingClientService.listByQuarterInternal(preRegistration.getUserId(), preRegistration.getYear(), preRegistration.getQuarter());
             } else {
                 records = accountingClientService.listByMonthInternal(preRegistration.getUserId(), preRegistration.getYear(), preRegistration.getMonth());
             }
            var calculator = new TaxCalculator(records);
            updatePreRegistrationByCalculator(preRegistration, calculator);
        });
    }

    private void updatePreRegistrationByCalculator(PreRegistration preRegistration, TaxCalculator calc) {
        preRegistration.setGrossExpenditure(calc.sumGrossExpenditures());
        preRegistration.setGrossRevenue(calc.sumGrossRevenue());
        preRegistration.setTaxAuthoritySubmitted(false);
        preRegistration.setInputTax(calc.calculateInputTax());
        preRegistration.setReverseCharge(calc.sumReverseCharge());
        preRegistration.setVat(calc.calculateVat());
        preRegistration.setVatPayable(calc.calculateVatPayable());
    }
}
