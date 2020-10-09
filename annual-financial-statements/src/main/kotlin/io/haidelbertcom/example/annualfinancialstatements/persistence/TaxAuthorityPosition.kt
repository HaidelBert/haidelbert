package io.haidelbertcom.example.annualfinancialstatements.persistence

import javax.persistence.*

@Entity(name="tax_authority_positions")
class TaxAuthorityPosition(
        @Id @GeneratedValue var id: Long? = null,
        @Column(name = "tax_number") var taxAuthorityNumber: String,
        @Column(name = "gross_amount") var grossAmunt: Long,
        @Column(name = "net_amount") var netAmount: Long,
        @ManyToOne var annualFinancialStatement: AnnualFinancialStatement
)
