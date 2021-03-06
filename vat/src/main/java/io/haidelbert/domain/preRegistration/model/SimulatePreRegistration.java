package io.haidelbert.domain.preRegistration.model;

import io.haidelbert.persistence.Interval;

public class SimulatePreRegistration {
    private Integer year;
    private Interval interval;
    private Integer intervalValue;

    public SimulatePreRegistration() {
    }

    public SimulatePreRegistration(Integer year, Interval interval, Integer intervalValue) {
        this.year = year;
        this.interval = interval;
        this.intervalValue = intervalValue;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    public Interval getInterval() {
        return interval;
    }

    public void setInterval(Interval interval) {
        this.interval = interval;
    }

    public Integer getIntervalValue() {
        return intervalValue;
    }

    public void setIntervalValue(Integer intervalValue) {
        this.intervalValue = intervalValue;
    }

}
