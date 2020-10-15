package io.haidelbertcom.example.annualfinancialstatements.config

import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Component

@Component
class ServiceCredentials(@Value("\${afs.credentials.username}") val serviceName: String,
                         @Value("\${afs.credentials.password}") val servicePassword: String)
