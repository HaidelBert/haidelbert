package io.haidelbert.messaging;

import io.quarkus.kafka.client.serialization.JsonbDeserializer;
import org.apache.kafka.common.header.Headers;

public class AccountingRecordDeserializer extends JsonbDeserializer<AccountingRecordMessaging> {

    public AccountingRecordDeserializer() {
        super(AccountingRecordMessaging.class);
    }

    @Override
    public AccountingRecordMessaging deserialize(String topic, Headers headers, byte[] data) {
        try {
            return super.deserialize(topic, headers, data);
        }catch(Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
