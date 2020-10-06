package io.haidelbert.domain.preRegistration.model;

import io.haidelbert.domain.preRegistration.create.TimeConstraints;
import io.haidelbert.persistence.Interval;

public class BaseTimeConstraints implements TimeConstraints {
    private Integer year;
    private Interval interval;
    private Integer intervalValue;

    public BaseTimeConstraints(Integer year, Interval interval, Integer intervalValue) {
        this.year = year;
        this.interval = interval;
        this.intervalValue = intervalValue;
    }

    @Override
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @Override
    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }

    @Override
    public Integer getIntervalValue() {
        return intervalValue;
    }

    public void setIntervalValue(Integer intervalValue) {
        this.intervalValue = intervalValue;
    }
}
