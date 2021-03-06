package io.haidelbertcom.example.annualfinancialstatements.config

import io.haidelbertcom.example.annualfinancialstatements.security.JWTAuthenticationFilter
import io.haidelbertcom.example.annualfinancialstatements.security.JwtDecoder
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource


@EnableWebSecurity
@Configuration
class SecurityConfig(@Value("\${JWT_PUBLIC_KEY}") private val base64JwtPublicKey: String): WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
        http.cors().and().csrf().disable().authorizeRequests()
                .antMatchers(HttpMethod.GET, "/actuator/health").permitAll()
                .anyRequest().authenticated()
                .and()
                .addFilter(JWTAuthenticationFilter(JwtDecoder(base64JwtPublicKey), authenticationManager()))
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource? {
        val defaultCorsConfig = CorsConfiguration().applyPermitDefaultValues()
        defaultCorsConfig.allowedMethods = listOf("GET", "POST", "GET", "DELETE", "OPTIONS", "PATCH")
        val source = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", defaultCorsConfig)
        return source
    }
}
