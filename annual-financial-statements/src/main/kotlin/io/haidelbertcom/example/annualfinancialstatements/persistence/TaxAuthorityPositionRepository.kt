package io.haidelbertcom.example.annualfinancialstatements.persistence

import org.springframework.data.jpa.repository.JpaRepository

interface TaxAuthorityPositionRepository: JpaRepository<TaxAuthorityPosition, Long> {
}
