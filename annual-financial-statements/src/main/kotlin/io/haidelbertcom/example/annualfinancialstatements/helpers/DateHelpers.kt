package io.haidelbertcom.example.annualfinancialstatements.helpers

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.ZoneOffset

fun utcSecondsToLocalDate(seconds: Long): LocalDate {
    return LocalDateTime.ofEpochSecond(seconds, 0, ZoneOffset.UTC).toLocalDate()
}
