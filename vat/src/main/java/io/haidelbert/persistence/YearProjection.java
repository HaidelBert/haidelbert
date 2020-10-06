package io.haidelbert.persistence;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public class YearProjection {
    public final Integer year;

    public YearProjection(Integer year) {
        this.year = year;
    }
}
