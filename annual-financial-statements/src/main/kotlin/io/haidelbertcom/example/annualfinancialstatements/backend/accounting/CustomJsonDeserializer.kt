package io.haidelbertcom.example.annualfinancialstatements.backend.accounting

import org.apache.kafka.common.header.Headers
import org.springframework.kafka.support.serializer.JsonDeserializer

class CustomJsonDeserializer<T>(targetType: Class<in T>?) : JsonDeserializer<T>(targetType){
    override fun deserialize(topic: String?, headers: Headers?, data: ByteArray?): T? {
        return try {
            super.deserialize(topic, headers, data)
        }catch(e: Exception) {
            e.printStackTrace()
            null
        }
    }

    override fun deserialize(topic: String?, data: ByteArray?): T? {
        return try {
            super.deserialize(topic, data)
        }catch (e: Exception) {
            e.printStackTrace()
            null
        }
    }
}
