package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.domain.AuthContext;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreatePreRegistrationFactory {

    private final PreRegistrationRepository repository;

    public CreatePreRegistrationFactory(PreRegistrationRepository repository) {
        this.repository = repository;
    }

    public CreatePreRegistrationStrategy createStrategy(TimeConstraints timeConstraints, AuthContext authContext) {
        if (timeConstraints.getInterval().equals(Interval.QUARTER)) {
            return new QuarterCreatePreRegistrationStrategy(timeConstraints, authContext, repository);
        }
        return new MonthCreatePreRegistrationStrategy(timeConstraints, authContext, repository);
    }

}
