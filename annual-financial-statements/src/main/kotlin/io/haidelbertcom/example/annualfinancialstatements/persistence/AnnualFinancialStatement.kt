package io.haidelbertcom.example.annualfinancialstatements.persistence

import javax.persistence.*

@Entity(name = "statements")
class AnnualFinancialStatement(
        @Id @GeneratedValue(strategy=GenerationType.IDENTITY) var id: Long? = null,
        @Column(name = "year") var year: Int = 0,
        @Column(name = "sum_gross_expenditure") var sumGrossExpenditure: Long = 0,
        @Column(name = "sum_net_expenditure") var sumNetExpenditure: Long = 0,
        @Column(name = "sum_gross_revenue") var sumGrossRevenue: Long = 0,
        @Column(name = "sum_net_revenue") var sumNetRevenue: Long = 0,
        @Column(name = "result") var result: Long= 0,
        @Column(name = "user_id") var userId: String = "",
        @OneToMany(mappedBy="annualFinancialStatement", fetch = FetchType.EAGER)
        var taxAuthorityPositions: MutableList<TaxAuthorityPosition> = mutableListOf(),
        @Column(name = "tax_authority_submitted") var taxAuthoritySubmitted: Boolean = false
)
