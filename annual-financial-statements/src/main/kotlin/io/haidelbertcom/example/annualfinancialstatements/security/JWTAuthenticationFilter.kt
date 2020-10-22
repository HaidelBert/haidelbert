package io.haidelbertcom.example.annualfinancialstatements.security

import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


private const val TOKEN_PREFIX = "Bearer "
private const val HEADER_STRING = "Authorization"

class JWTAuthenticationFilter(private val jwtDecoder: JwtDecoder, authenticationManager: AuthenticationManager?) : BasicAuthenticationFilter(authenticationManager) {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val header: String? = request.getHeader(HEADER_STRING)

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }

        val authentication: UsernamePasswordAuthenticationToken? = getAuthentication(request)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(HEADER_STRING).replace(TOKEN_PREFIX, "")
        val claims = jwtDecoder.decode(token)
        val authorities = (claims!!["groups"] as ArrayList<String>).joinToString(",")
        return UsernamePasswordAuthenticationToken(claims["userId"].toString(), null, AuthorityUtils.commaSeparatedStringToAuthorityList(authorities))
    }
}
