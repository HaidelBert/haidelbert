package io.haidelbert.domain.preRegistration.create;

import io.haidelbert.persistence.Interval;

public interface TimeConstraints {

    public Integer getYear();

    public Interval getInterval();

    public Integer getIntervalValue();


}
