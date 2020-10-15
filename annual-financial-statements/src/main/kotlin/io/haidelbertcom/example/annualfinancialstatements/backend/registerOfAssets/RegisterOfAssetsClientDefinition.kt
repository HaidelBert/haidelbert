package io.haidelbertcom.example.annualfinancialstatements.backend.registerOfAssets

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.RequestHeader
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam

@FeignClient(value = "registerOfAssetsClientDefinition", url = "\${register-of-assets.serviceUrl}")
interface RegisterOfAssetsClientDefinition {
    @RequestMapping(method = [RequestMethod.GET], value = ["/register-of-assets/api/internal/year-depreciations"])
    fun getYearDepreciationInternal(
            @RequestParam(value = "user_id") userId: String,
            @RequestParam(value = "year") year: Int,
            @RequestHeader("Authorization") auth: String
    ): YearDepreciation?
}
