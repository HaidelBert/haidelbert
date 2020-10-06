package io.haidelbert.domain.create;

import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.model.CreatePreRegistration;
import io.haidelbert.persistence.Interval;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreatePreRegistrationFactory {

    private final AccountingClient accountingClient;

    public CreatePreRegistrationFactory(@RestClient AccountingClient accountingClient) {
        this.accountingClient = accountingClient;
    }

    public CreatePreRegistrationStrategy createStrategy(CreatePreRegistration create, UserContext userContext) {
        if (create.getInterval().equals(Interval.QUARTER)) {
            return new QuarterCreatePreRegistrationStrategy(create, userContext, accountingClient);
        }
        return new MonthCreatePreRegistrationStrategy(create, userContext, accountingClient);
    }
}
