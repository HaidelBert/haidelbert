package io.haidelbert.messaging;

import io.haidelbert.domain.preRegistration.Service;
import io.smallrye.reactive.messaging.annotations.Blocking;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AccountingReceiver {

    private final Service service;

    public AccountingReceiver(Service service) {
        this.service = service;
    }

    @Incoming("accounting_record_created")
    @Blocking
    public void onAccountingRecordCreated(AccountingRecordMessaging recordMessaging) {
        service.onNewAccountingRecord(recordMessaging);
    }
}
