package io.haidelbertcom.example.annualfinancialstatements.api

import io.haidelbertcom.example.annualfinancialstatements.domain.exception.ConflictException
import io.haidelbertcom.example.annualfinancialstatements.domain.exception.NotFoundException
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.context.request.WebRequest
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class GlobalExceptionHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(value = [ConflictException::class])
    protected fun handleConflict(ex: ConflictException, request: WebRequest?): ResponseEntity<Any?>? {
        val bodyOfResponse = ex.message
        return handleExceptionInternal(ex, bodyOfResponse, HttpHeaders(), HttpStatus.CONFLICT, request!!)
    }

    @ExceptionHandler(value = [NotFoundException::class])
    protected fun handleNotFound(ex: NotFoundException, request: WebRequest?): ResponseEntity<Any?>? {
        val bodyOfResponse = ex.message
        return handleExceptionInternal(ex, bodyOfResponse, HttpHeaders(), HttpStatus.NOT_FOUND, request!!)
    }
}
