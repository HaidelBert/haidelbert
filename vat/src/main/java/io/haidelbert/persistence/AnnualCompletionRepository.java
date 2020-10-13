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

    public AnnualCompletion getByUserAndYear(String userId, int year) {
        return find("userId=?1 and year=?2", userId, year).singleResult();
    }
}
