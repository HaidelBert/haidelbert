package io.haidelbert.backends.accounting;

import io.haidelbert.config.ServiceCredentials;
import io.haidelbert.domain.UserContext;
import org.eclipse.microprofile.rest.client.inject.RestClient;

import javax.enterprise.context.ApplicationScoped;
import java.util.Base64;
import java.util.List;

@ApplicationScoped
public class AccountingClientService {

    private final AccountingClient accountingClient;
    private final ServiceCredentials serviceCredentials;

    public AccountingClientService(@RestClient AccountingClient accountingClient, ServiceCredentials serviceCredentials) {
        this.accountingClient = accountingClient;
        this.serviceCredentials = serviceCredentials;
    }

    public List<AccountingRecord> listByQuarter(UserContext uCtx, int year, Integer quarter){
        return this.accountingClient.listByQuarter(getBearerAuthHeader(uCtx), year, quarter);
    }

    public List<AccountingRecord> listByMonth(UserContext uCtx, int year, Integer month){
        return this.accountingClient.listByMonth(getBearerAuthHeader(uCtx), year, month);
    }

    public List<AccountingRecord> listByQuarterInternal(String userId, int year, Integer quarter){
        return this.accountingClient.listByQuarterInternal(getBasicAuthHeaderForInternal(), userId, year, quarter);
    }

    public List<AccountingRecord> listByMonthInternal(String userId, int year, Integer month){
        return this.accountingClient.listByMonthInternal(getBasicAuthHeaderForInternal(), userId, year, month);
    }

    private String getBearerAuthHeader(UserContext uCtx) {
        return "Bearer " + uCtx.getAccessToken();
    }

    private String getBasicAuthHeaderForInternal() {
        return "Basic " + Base64.getEncoder().encodeToString((serviceCredentials.getServiceName()+":"+serviceCredentials.getServicePassword()).getBytes());
    }
}
