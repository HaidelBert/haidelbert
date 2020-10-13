package io.haidelbertcom.example.annualfinancialstatements.messaging

import io.haidelbertcom.example.annualfinancialstatements.domain.AnnualFinancialStatementService
import org.apache.kafka.clients.consumer.ConsumerConfig
import org.apache.kafka.common.serialization.StringDeserializer
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.kafka.annotation.KafkaListener
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory
import org.springframework.kafka.core.ConsumerFactory
import org.springframework.kafka.core.DefaultKafkaConsumerFactory
import org.springframework.kafka.support.serializer.JsonDeserializer
import org.springframework.messaging.handler.annotation.Payload


@Configuration
class AccountingReceiver(
        @Value("\${kafka.servers}") private val kafkaServers: String,
        private val annualFinancialStatementService: AnnualFinancialStatementService
) {
    @Bean
    fun accountingConsumer(): ConsumerFactory<String, AccountingRecordMessaging> {
        val configProps: MutableMap<String, Any> = HashMap()
        configProps[ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG] = kafkaServers
        configProps[ConsumerConfig.GROUP_ID_CONFIG] = "annualfinancialstatements-group"
        return DefaultKafkaConsumerFactory<String, AccountingRecordMessaging>(configProps, StringDeserializer(), JsonDeserializer(AccountingRecordMessaging::class.java))
    }

    @Bean
    fun greetingKafkaListenerContainerFactory(): ConcurrentKafkaListenerContainerFactory<String, AccountingRecordMessaging>? {
        val factory: ConcurrentKafkaListenerContainerFactory<String, AccountingRecordMessaging> = ConcurrentKafkaListenerContainerFactory()
        factory.consumerFactory = accountingConsumer()
        return factory
    }

    @KafkaListener(topics = ["accounting_record_created"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onNewRecord(@Payload message: AccountingRecordMessaging) {
        annualFinancialStatementService.handleAccountingRecordModified(message)
    }

    @KafkaListener(topics = ["accounting_record_changed"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onRecordChanged(@Payload message: AccountingRecordMessaging) {
        annualFinancialStatementService.handleAccountingRecordModified(message)
    }

    @KafkaListener(topics = ["accounting_record_deleted"], containerFactory = "greetingKafkaListenerContainerFactory")
    fun onRecordDeleted(@Payload message: AccountingRecordMessaging) {
        annualFinancialStatementService.handleAccountingRecordModified(message)
    }
}
