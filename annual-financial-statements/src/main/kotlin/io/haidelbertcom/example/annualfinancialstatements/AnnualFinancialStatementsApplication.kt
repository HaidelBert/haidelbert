package io.haidelbertcom.example.annualfinancialstatements

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.openfeign.EnableFeignClients

@SpringBootApplication
@EnableFeignClients
class AnnualFinancialStatementsApplication

fun main(args: Array<String>) {
	runApplication<AnnualFinancialStatementsApplication>(*args)
}
