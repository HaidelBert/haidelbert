package io.haidelbert.persistence;

import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

@ApplicationScoped
public class PreRegistrationRepository implements PanacheRepository<PreRegistration> {

    private EntityManager em;

    public PreRegistrationRepository(EntityManager em) {
        this.em = em;
    }

    public long countByQuarter(String userId, int year, int quarter) {
        return count("year=?1 and quarter=?2", year, quarter);
    }

    public Long countByMonth(String userId, int year, int month) {
        return count("year=?1 and month=?2", year, month);
    }

    public List<Integer> findDistinctYears(String userId) {
        return em
                .createQuery("select DISTINCT(p.year) from pre_registrations p order by p.year", Integer.class)
                .getResultList();
    }

    public List<PreRegistration> listByYear(int year) {
        return list("year", year);
    }

    public List<PreRegistration> listByUserAndYear(String userId, int year) {
        return list("userId=?1 and year=?2", userId, year);
    }

    public List<PreRegistration> listByBookingDate(String userId, LocalDate bookingDate){
        return em
                .createQuery("select p from pre_registrations p where p.userId=:userId and :bookingDate BETWEEN p.from and p.to", PreRegistration.class)
                .setParameter("bookingDate", bookingDate)
                .setParameter("userId", userId)
                .getResultList();
    }

    public boolean hasOpenPreRegistrations(String userId, int year){
        return count("userId=?1 and year=?2 and taxAuthoritySubmitted=false", userId, year) > 0;
    }
}
