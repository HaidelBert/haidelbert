package io.haidelbertcom.example.annualfinancialstatements.api

import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import org.bouncycastle.util.io.pem.PemObject
import org.bouncycastle.util.io.pem.PemReader
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.AuthorityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter
import java.io.StringReader
import java.security.KeyFactory
import java.security.spec.X509EncodedKeySpec
import java.util.*
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


private const val TOKEN_PREFIX = "Bearer "
private const val HEADER_STRING = "Authorization"

class JWTAuthenticationFilter(base64PublicKey: String, authenticationManager: AuthenticationManager?) : BasicAuthenticationFilter(authenticationManager) {

    private val jwtParser: JwtParser

    init {
        val publicKeyPem = String(Base64.getDecoder().decode(base64PublicKey))
        /*val publicKey: String = publicKeyPem.replace("-----BEGIN PUBLIC KEY-----\n", "")
                .replace("\n-----END PUBLIC KEY-----", "")*/
        val pemReader = PemReader(StringReader(publicKeyPem))
        var pemObject: PemObject? = null
        pemReader.use { pemReader ->
            pemObject = pemReader.readPemObject();
        }
        val spec = X509EncodedKeySpec(pemObject!!.content)
        val kf: KeyFactory = KeyFactory.getInstance("RSA")
        val pubKey = kf.generatePublic(spec)
        this.jwtParser = Jwts.parserBuilder().setSigningKey(pubKey).build();
    }

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        val header: String = request.getHeader(HEADER_STRING)

        if (header == null || !header.startsWith(TOKEN_PREFIX)) {
            chain.doFilter(request, response)
            return
        }

        val authentication: UsernamePasswordAuthenticationToken? = getAuthentication(request)

        SecurityContextHolder.getContext().authentication = authentication
        chain.doFilter(request, response)
    }

    private fun getAuthentication(request: HttpServletRequest): UsernamePasswordAuthenticationToken? {
        val token = request.getHeader(HEADER_STRING)
        if (token != null) {
            val claims = jwtParser.parseClaimsJws(token.replace(TOKEN_PREFIX, ""))
            return if (claims.body["userId"] != null) {
                UsernamePasswordAuthenticationToken(claims.body["userId"], null, AuthorityUtils.commaSeparatedStringToAuthorityList(claims.body["groups"].toString()))
            } else null
        }
        return null
    }
}
