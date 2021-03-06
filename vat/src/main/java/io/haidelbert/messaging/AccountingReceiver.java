package io.haidelbert.messaging;

import io.haidelbert.domain.annualCompletion.AnnualCompletionFacade;
import io.haidelbert.domain.preRegistration.PreRegistrationFacade;
import io.smallrye.reactive.messaging.annotations.Blocking;
import org.eclipse.microprofile.reactive.messaging.Incoming;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class AccountingReceiver {

    private final PreRegistrationFacade preRegistrationFacade;
    private final AnnualCompletionFacade annualCompletionFacade;

    public AccountingReceiver(PreRegistrationFacade preRegistrationFacade, AnnualCompletionFacade annualCompletionFacade) {
        this.preRegistrationFacade = preRegistrationFacade;
        this.annualCompletionFacade = annualCompletionFacade;
    }

    @Incoming("accounting_record_created")
    @Blocking
    public void onAccountingRecordCreated(AccountingRecordMessaging recordFromMessaging) {
        preRegistrationFacade.onAccountingRecordModified(recordFromMessaging);
        annualCompletionFacade.onAccountingRecordModified(recordFromMessaging);
    }

    @Incoming("accounting_record_changed")
    @Blocking
    public void onAccountingRecordChanged(AccountingRecordMessaging recordFromMessaging) {
        preRegistrationFacade.onAccountingRecordModified(recordFromMessaging);
        annualCompletionFacade.onAccountingRecordModified(recordFromMessaging);
    }

    @Incoming("accounting_record_deleted")
    @Blocking
    public void onAccountingRecordDeleted(AccountingRecordMessaging recordFromMessaging) {
        preRegistrationFacade.onAccountingRecordModified(recordFromMessaging);
        annualCompletionFacade.onAccountingRecordModified(recordFromMessaging);
    }
}
