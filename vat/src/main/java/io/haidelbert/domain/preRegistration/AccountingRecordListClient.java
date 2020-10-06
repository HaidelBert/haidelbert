package io.haidelbert.domain.preRegistration;

import io.haidelbert.backends.accounting.AccountingClient;
import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.domain.AuthContext;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.preRegistration.create.TimeConstraints;
import io.haidelbert.persistence.Interval;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class AccountingRecordListClient {

    private final AccountingClient accountingClient;

    public AccountingRecordListClient(@RestClient AccountingClient accountingClient) {
        this.accountingClient = accountingClient;
    }

    List<AccountingRecord> list(AuthContext context, TimeConstraints timeConstraints){
        if (context instanceof UserContext) {
            if (timeConstraints.getInterval().equals(Interval.QUARTER)) {
                return accountingClient.listByQuarter(context.getAuthHeader(), timeConstraints.getYear(), timeConstraints.getIntervalValue());
            }
            return accountingClient.listByMonth(context.getAuthHeader(), timeConstraints.getYear(), timeConstraints.getIntervalValue());
        } else {
            if (timeConstraints.getInterval().equals(Interval.QUARTER)) {
                return accountingClient.listByQuarterForService(context.getAuthHeader(), context.getUserId(), timeConstraints.getYear(), timeConstraints.getIntervalValue());
            }
            return accountingClient.listByMonthForService(context.getAuthHeader(), context.getUserId(), timeConstraints.getYear(), timeConstraints.getIntervalValue());
        }
    }
}
