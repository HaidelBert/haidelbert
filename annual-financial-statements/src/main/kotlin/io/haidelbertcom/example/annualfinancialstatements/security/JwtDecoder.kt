package io.haidelbertcom.example.annualfinancialstatements.security

import io.jsonwebtoken.JwtParser
import io.jsonwebtoken.Jwts
import org.bouncycastle.util.io.pem.PemObject
import org.bouncycastle.util.io.pem.PemReader
import java.io.StringReader
import java.security.KeyFactory
import java.security.spec.X509EncodedKeySpec
import java.util.*

class JwtDecoder(base64PublicKey: String) {

    private val jwtParser: JwtParser

    init {
        val publicKeyPem = String(Base64.getDecoder().decode(base64PublicKey))
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

    fun decode(token: String): Map<String, Any>? {
        val claims = jwtParser.parseClaimsJws(token)
        return claims.body
    }
}
