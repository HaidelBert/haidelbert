package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistrationRepository;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class CreatePreRegistrationFactory {

    private final PreRegistrationRepository repository;

    public CreatePreRegistrationFactory(PreRegistrationRepository repository) {
        this.repository = repository;
    }

    public CreatePreRegistrationStrategy createStrategy(TimeConstraints timeConstraints) {
        if (timeConstraints.getInterval().equals(Interval.QUARTER)) {
            return new QuarterCreatePreRegistrationStrategy(timeConstraints, repository);
        }
        return new MonthCreatePreRegistrationStrategy(timeConstraints, repository);
    }

}
