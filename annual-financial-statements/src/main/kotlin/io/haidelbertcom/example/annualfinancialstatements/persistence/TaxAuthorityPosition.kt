package io.haidelbertcom.example.annualfinancialstatements.persistence

import javax.persistence.*

@Entity(name="tax_authority_positions")
class TaxAuthorityPosition(
        @Id @GeneratedValue(strategy=GenerationType.IDENTITY) var id: Long? = null,
        @Column(name = "tax_number") var taxAuthorityNumber: String = "",
        @Column(name = "gross_amount") var grossAmunt: Long = 0,
        @Column(name = "net_amount") var netAmount: Long = 0,
        @ManyToOne @JoinColumn(name="statement_id") var annualFinancialStatement: AnnualFinancialStatement? = null
)
