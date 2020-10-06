package io.haidelbert.persistence;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.util.List;

@ApplicationScoped
public class PreRegistrationRepository implements PanacheRepository<PreRegistration> {

    private EntityManager em;

    public PreRegistrationRepository(EntityManager em) {
        this.em = em;
    }

    public long countByQuarter(int year, int quarter) {
        return count("year=?1 and quarter=?2", year, quarter);
    }

    public Long countByMonth(int year, int month) {
        return count("year=?1 and month=?2", year, month);
    }

    public List<Integer> findDistinctYears(String userId) {
        return em
                .createQuery("select DISTINCT(p.year) from pre_registrations p order by p.year", Integer.class)
                .getResultList();
    }
}
