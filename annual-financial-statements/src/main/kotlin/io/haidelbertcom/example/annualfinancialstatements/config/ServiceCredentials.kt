package io.haidelbertcom.example.annualfinancialstatements.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class ServiceCredentials(@Value("\${accounting.credentials.username}") val serviceName: String,
                         @Value("\${accounting.credentials.password}") val servicePassword: String)
