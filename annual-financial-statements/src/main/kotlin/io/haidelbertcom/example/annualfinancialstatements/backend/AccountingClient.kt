package io.haidelbertcom.example.annualfinancialstatements.backend

import io.haidelbertcom.example.annualfinancialstatements.config.ServiceCredentials
import org.springframework.stereotype.Component
import java.util.*

@Component
class AccountingClient(
        private val serviceCredentials: ServiceCredentials,
        private val accountingClientDefinition: AccountingClientDefinition
) {
    fun listInternal(userId: String, year: Int): List<AccountingRecord>{
        return this.accountingClientDefinition.listInternal(userId, year, getAuthHeader())
    }

    private fun getAuthHeader(): String {
        return "Basic " + Base64.getEncoder().encodeToString((serviceCredentials.serviceName + ":" + serviceCredentials.servicePassword).toByteArray())
    }
}
