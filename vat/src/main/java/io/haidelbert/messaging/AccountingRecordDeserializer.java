package io.haidelbert.messaging;

import io.quarkus.kafka.client.serialization.JsonbDeserializer;

public class AccountingRecordDeserializer extends JsonbDeserializer<AccountingRecordMessaging> {

    public AccountingRecordDeserializer() {
        super(AccountingRecordMessaging.class);
    }
}
