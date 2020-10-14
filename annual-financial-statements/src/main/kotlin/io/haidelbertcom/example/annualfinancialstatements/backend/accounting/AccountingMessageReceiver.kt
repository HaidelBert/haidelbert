package io.haidelbertcom.example.annualfinancialstatements.backend.accounting

import io.haidelbertcom.example.annualfinancialstatements.domain.AnnualFinancialStatementFacade
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.messaging.handler.annotation.Payload


@Configuration
class AccountingMessageReceiver(
        @Value("\${kafka.servers}") private val kafkaServers: String,
        @Value("\${kafka.properties.security.protocol:}") private val kafkaSecurityProtocol: String?,
        @Value("\${kafka.properties.sasl.mechanism:}") private val kafkaSaslMechanism: String?,
        @Value("\${kafka.properties.sasl.jaas.config:}") private val kafkaSaslJaasConfig: String?,
        private val annualFinancialStatementFacade: AnnualFinancialStatementFacade
) {
    @Bean
    fun accountingConsumer(): ConsumerFactory<String, AccountingRecord> {
        val configProps: MutableMap<String, Any> = HashMap()
        configProps[ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG] = kafkaServers
        configProps[ConsumerConfig.GROUP_ID_CONFIG] = "annualfinancialstatements-group"
        if (kafkaSaslMechanism!="" || kafkaSecurityProtocol!="" || kafkaSaslJaasConfig!="") {
            configProps["sasl.mechanism"] = kafkaSaslMechanism!!
            configProps["security.protocol"] = kafkaSecurityProtocol!!
            configProps["sasl.jaas.config"] = kafkaSaslJaasConfig!!
        }

        return DefaultKafkaConsumerFactory<String, AccountingRecord>(configProps, StringDeserializer(), CustomJsonDeserializer(AccountingRecord::class.java))
    }

    @Bean
    fun greetingKafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, AccountingRecord>? {
        val factory: ConcurrentKafkaListenerContainerFactory<String, AccountingRecord> = ConcurrentKafkaListenerContainerFactory()
        factory.consumerFactory = accountingConsumer()
        return factory
    }

    @KafkaListener(topics = ["accounting_record_created"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onNewRecord(@Payload message: AccountingRecord) {
        annualFinancialStatementFacade.handleAccountingRecordModified(message)
    }

    @KafkaListener(topics = ["accounting_record_changed"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onRecordChanged(@Payload message: AccountingRecord) {
        annualFinancialStatementFacade.handleAccountingRecordModified(message)
    }

    @KafkaListener(topics = ["accounting_record_deleted"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onRecordDeleted(@Payload message: AccountingRecord) {
        annualFinancialStatementFacade.handleAccountingRecordModified(message)
    }
}
