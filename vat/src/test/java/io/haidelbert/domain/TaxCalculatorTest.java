package io.haidelbert.domain;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.backends.accounting.Category;
import io.haidelbert.backends.accounting.ReceiptType;
import io.haidelbert.domain.preRegistration.TaxCalculator;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TaxCalculatorTest {

    @Test
    public void test_ByExample() {
        var record1 = new AccountingRecord(1L, 1L, 1L, "", 1913L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record2 = new AccountingRecord(1L, 1L, 1L, "", 2066L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record3 = new AccountingRecord(1L, 1L, 1L, "", 3300L, 10, ReceiptType.CASH, Category.TRAVELLING, false);
        var record4 = new AccountingRecord(1L, 1L, 1L, "", 3305L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record5 = new AccountingRecord(1L, 1L, 1L, "", 912L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record6 = new AccountingRecord(1L, 1L, 1L, "", 774720L, 20, ReceiptType.CASH, Category.REVENUE_SERVICES, false);
        var record7 = new AccountingRecord(1L, 1L, 1L, "", 1806L, 20, ReceiptType.CASH, Category.POST_PHONE, false);

        var record8 = new AccountingRecord(1L, 1L, 1L, "", 1913L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record9 = new AccountingRecord(1L, 1L, 1L, "", 2066L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record10 = new AccountingRecord(1L, 1L, 1L, "", 3300L, 10, ReceiptType.CASH, Category.TRAVELLING, false);
        var record11 = new AccountingRecord(1L, 1L, 1L, "", 3305L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record12 = new AccountingRecord(1L, 1L, 1L, "", 1788L, 20, ReceiptType.CASH, Category.MISC_EXPENDITURE, false);
        var record13 = new AccountingRecord(1L, 1L, 1L, "", 912L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record14 = new AccountingRecord(1L, 1L, 1L, "", 712068L, 0, ReceiptType.CASH, Category.TAX_AUTHORITY_PAYMENT, false);
        var record15 = new AccountingRecord(1L, 1L, 1L, "", 920250L, 20, ReceiptType.CASH, Category.REVENUE_SERVICES, false);
        var record16 = new AccountingRecord(1L, 1L, 1L, "", 1490L, 20, ReceiptType.CASH, Category.POST_PHONE, false);
        var record17 = new AccountingRecord(1L, 1L, 1L, "", 520701L, 0, ReceiptType.CASH, Category.SVA, false);

        var record18 = new AccountingRecord(1L, 1L, 1L, "", 1913L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record19 = new AccountingRecord(1L, 1L, 1L, "", 2066L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record20 = new AccountingRecord(1L, 1L, 1L, "", 3300L, 10, ReceiptType.CASH, Category.TRAVELLING, false);
        var record21 = new AccountingRecord(1L, 1L, 1L, "", 3305L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record22 = new AccountingRecord(1L, 1L, 1L, "", 893970L, 20, ReceiptType.CASH, Category.REVENUE_SERVICES, false);
        var record23 = new AccountingRecord(1L, 1L, 1L, "", 912L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false);
        var record24 = new AccountingRecord(1L, 1L, 1L, "", 4033L, 20, ReceiptType.CASH, Category.MISC_EXPENDITURE, false);
        var record25 = new AccountingRecord(1L, 1L, 1L, "", 2191L, 20, ReceiptType.CASH, Category.MISC_EXPENDITURE, false);
        var record26 = new AccountingRecord(1L, 1L, 1L, "", 2379L, 20, ReceiptType.CASH, Category.MISC_EXPENDITURE, false);
        var record27 = new AccountingRecord(1L, 1L, 1L, "", 1490L, 20, ReceiptType.CASH, Category.POST_PHONE, false);
        var record28 = new AccountingRecord(1L, 1L, 1L, "", 3451L, 0, ReceiptType.CASH, Category.INTEREST_CHARGES, false);
        var record29 = new AccountingRecord(1L, 1L, 1L, "", 100000L, 0, ReceiptType.CASH, Category.REVENUE_SERVICES, true);
        var record30 = new AccountingRecord(1L, 1L, 1L, "", 120000L, 20, ReceiptType.CASH, Category.REVENUE_DEPRECIATIONS, false);


        var sut = new TaxCalculator(List.of(record1, record2, record3, record4, record5, record6, record7, record8, record9, record10, record11, record12, record13, record14, record15, record16, record17, record18, record19, record20, record21, record22, record23, record24, record25, record26, record27, record28, record29, record30));
        var inputTax = sut.calculateInputTax();
        var vat = sut.calculateVat();
        var vatPayable = sut.calculateVatPayable();
        Assertions.assertEquals(451490L, vat);
        Assertions.assertEquals(443963L, vatPayable);
        Assertions.assertEquals(7527L, inputTax);
        Assertions.assertEquals(2808940L, sut.sumGrossRevenue());
        Assertions.assertEquals(1285885L, sut.sumGrossExpenditures());
        Assertions.assertEquals(100000L, sut.sumReverseCharge());
    }
}
