package io.haidelbert.messaging;

import io.quarkus.kafka.client.serialization.JsonbDeserializer;

public class AccountingRecordDeserializer extends JsonbDeserializer<AccountingRecordRaw> {

    public AccountingRecordDeserializer() {
        super(AccountingRecordRaw.class);
    }
}
