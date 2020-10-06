package io.haidelbert.domain.annualCompletion;

import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.annualCompletion.model.ChangeAnnualCompletion;
import io.haidelbert.domain.annualCompletion.model.CreateAnnualCompletion;
import io.haidelbert.domain.exception.ConflictException;
import io.haidelbert.domain.model.FinancialData;
import io.haidelbert.persistence.AnnualCompletion;
import io.haidelbert.persistence.AnnualCompletionRepository;
import io.haidelbert.persistence.PreRegistration;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.transaction.Transactional;
import java.util.List;
import java.util.function.Function;

@ApplicationScoped
public class Service {

    private final AnnualCompletionRepository repository;
    private final PreRegistrationRepository preRegistrationsRepository;

    public Service(AnnualCompletionRepository repository, PreRegistrationRepository preRegistrationsRepository) {
        this.repository = repository;
        this.preRegistrationsRepository = preRegistrationsRepository;
    }

    @Transactional
    public List<AnnualCompletion> list(UserContext context) {
        return repository.listByUser(context.getUserId());
    }

    @Transactional
    public AnnualCompletion add(UserContext context, CreateAnnualCompletion create) {
        if (repository.alreadyExists(create.getYear())) {
            throw new ConflictException("Erklärung für das Jahr "+create.getYear()+" existiert bereits");
        }
        var preRegistrations = preRegistrationsRepository.listByYear(create.getYear());
        var financialData = calculateFinancialData(preRegistrations);

        var newAnnualCompletion = new AnnualCompletion(
                financialData,
                create.getYear(),
                context.getUserId(),
                create.getTaxAuthoritySubmitted());

        repository.persist(newAnnualCompletion);

        return newAnnualCompletion;
    }

    @Transactional
    public void change(UserContext context, Long id, ChangeAnnualCompletion change) {
        var annualCompletion = repository.findById(id);
        annualCompletion.setTaxAuthoritySubmitted(change.isTaxAuthoritySubmitted());
    }

    @Transactional
    public FinancialData simulate(UserContext context, Integer year) {
        var preRegistrations = preRegistrationsRepository.listByYear(year);

        return calculateFinancialData(preRegistrations);
    }

    private FinancialData calculateFinancialData(List<PreRegistration> list) {
        var sumGrossRevenue = sum(list, PreRegistration::getGrossRevenue);
        var sumGrossExpenditure = sum(list, PreRegistration::getGrossExpenditure);
        var sumVat = sum(list, PreRegistration::getVat);
        var sumInputTax = sum(list, PreRegistration::getInputTax);
        var sumReverseCharge = sum(list, PreRegistration::getReverseCharge);
        var sumVatPayable = sum(list, PreRegistration::getVatPayable);

        return new FinancialData(sumGrossRevenue, sumGrossExpenditure, sumVat, sumInputTax, sumReverseCharge, sumVatPayable);
    }

    private Long sum(List<PreRegistration> list, Function<PreRegistration, Long> mapF) {
        return list
                .stream()
                .map(mapF)
                .reduce(Long::sum)
                .orElse(0L);
    }
}
