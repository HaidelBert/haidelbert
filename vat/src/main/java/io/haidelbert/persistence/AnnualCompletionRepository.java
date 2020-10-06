package io.haidelbert.persistence;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AnnualCompletionRepository implements PanacheRepository<AnnualCompletion> {

    public List<AnnualCompletion> listByUser(String userId){
        return list("userId", userId);
    }

    public boolean alreadyExists(int year) {
        return count("year", year) > 0;
    }
}
