package io.haidelbertcom.example.annualfinancialstatements.persistence

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id

@Entity(name = "statements")
class AnnualFinancialStatement(
        @Id @GeneratedValue var id: Long? = null,
        @Column(name = "year") var year: Int,
        @Column(name = "sum_gross_expenditure") var sumGrossExpenditure: Long,
        @Column(name = "sum_net_expenditure") var sumNetExpenditure: Long,
        @Column(name = "sum_gross_revenue") var sumGrossRevenue: Long,
        @Column(name = "sum_net_revenue") var sumNetRevenue: Long,
        @Column(name = "result") var result: Long,
        @Column(name = "user_id") var userId: String
)
