package io.haidelbertcom.example.annualfinancialstatements.backend

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(value = "accountingClientDefinition", url = "\${accountingServiceUrl}")
interface AccountingClientDefinition {

    @RequestMapping(method = [RequestMethod.GET], value = ["/accounting/api/internal/"])
    fun listInternal(
            @RequestParam(value = "user_id") userId: String,
            @RequestParam(value = "year") year: Int,
            @RequestHeader("Authorization") auth: String
    ): List<AccountingRecord>
}
