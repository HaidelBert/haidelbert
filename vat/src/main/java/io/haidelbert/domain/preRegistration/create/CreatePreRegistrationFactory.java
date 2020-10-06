package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.domain.preRegistration.model.SimulatePreRegistration;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistrationRepository;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreatePreRegistrationFactory {

    private final AccountingClient accountingClient;
    private final PreRegistrationRepository repository;

    public CreatePreRegistrationFactory(@RestClient  AccountingClient accountingClient, PreRegistrationRepository repository) {
        this.accountingClient = accountingClient;
        this.repository = repository;
    }

    public CreatePreRegistrationStrategy createStrategy(TimeConstraints timeConstraints, UserContext userContext) {
        if (timeConstraints.getInterval().equals(Interval.QUARTER)) {
            return new QuarterCreatePreRegistrationStrategy(timeConstraints, userContext, accountingClient, repository);
        }
        return new MonthCreatePreRegistrationStrategy(timeConstraints, userContext, accountingClient, repository);
    }
}
