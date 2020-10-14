package io.haidelbertcom.example.annualfinancialstatements.backend.registerOfAssets

import io.haidelbertcom.example.annualfinancialstatements.config.ServiceCredentials
import org.springframework.stereotype.Component
import java.util.*

@Component
class RegisterOfAssetsClient(
        private val serviceCredentials: ServiceCredentials,
        private val registerOfAssetsClientDefinition: RegisterOfAssetsClientDefinition

) {
    fun getYearDepreciationInternal(userId: String, year: Int): YearDepreciation? {
        return registerOfAssetsClientDefinition.getYearDepreciationInternal(userId, year, getAuthHeader())
    }

    private fun getAuthHeader(): String {
        return "Basic " + Base64.getEncoder().encodeToString((serviceCredentials.serviceName + ":" + serviceCredentials.servicePassword).toByteArray())
    }
}
