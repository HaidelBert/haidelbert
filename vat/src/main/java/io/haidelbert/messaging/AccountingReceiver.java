package io.haidelbert.messaging;

import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AccountingReceiver {
    @Incoming("accounting_record_created")
    public void onAccountingRecordCreated(AccountingRecordRaw raw) {
        System.out.println(raw);
    }
}
