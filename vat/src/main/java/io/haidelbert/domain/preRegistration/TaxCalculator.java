package io.haidelbert.domain;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.backends.accounting.CategoryHelper;
import org.joda.money.BigMoney;
import org.joda.money.CurrencyUnit;
import org.joda.money.Money;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

public class TaxCalculator {

    private static final CurrencyUnit DEFAULT_CURRENCY = CurrencyUnit.EUR;

    private final List<AccountingRecord> records;

    public TaxCalculator(List<AccountingRecord> records) {
        this.records = records;
    }

    public Long calculateVat() {
        return records
                .stream()
                .filter(accountingRecord -> CategoryHelper.isRevenueCategory(accountingRecord.getCategory()))
                .map(accountingRecord -> {
                    var grossAmount = BigMoney.ofMinor(DEFAULT_CURRENCY, accountingRecord.getGrossAmount());
                    var ratio = ((float)accountingRecord.getTaxRate() + 100f) / 100f;
                    return grossAmount.minus(grossAmount.dividedBy(ratio, RoundingMode.HALF_EVEN));
                })
                .reduce(BigMoney::plus)
                .orElse(BigMoney.of(DEFAULT_CURRENCY, 0))
                .getAmountMinorLong();
    }

    public Long calculateInputTax() {
        return records
                .stream()
                .filter(accountingRecord -> CategoryHelper.isExpenditureCategory(accountingRecord.getCategory()))
                .map(accountingRecord -> {
                    var grossAmount = BigMoney.ofMinor(DEFAULT_CURRENCY, accountingRecord.getGrossAmount());
                    var ratio = ((float)accountingRecord.getTaxRate() + 100f) / 100f;
                    return grossAmount.minus(grossAmount.dividedBy(ratio, RoundingMode.HALF_EVEN));
                })
                .reduce(BigMoney::plus)
                .orElse(BigMoney.of(DEFAULT_CURRENCY, 0))
                .getAmountMinorLong();
    }

    public Long calculateVatPayable(){
        return calculateVat() - calculateInputTax();
    }

    public Long sumGrossRevenue() {
        return records.stream()
                .filter(accountingRecord -> CategoryHelper.isRevenueCategory(accountingRecord.getCategory()))
                .map(AccountingRecord::getGrossAmount)
                .reduce(Long::sum).orElse(0L);
    }

    public Long sumReverseCharge() {
        return records.stream()
                .filter(AccountingRecord::isReverseCharge)
                .map(AccountingRecord::getGrossAmount)
                .reduce(Long::sum).orElse(0L);
    }

    public Long sumGrossExpenditures() {
        return records.stream()
                .filter(accountingRecord -> CategoryHelper.isExpenditureCategory(accountingRecord.getCategory()))
                .map(AccountingRecord::getGrossAmount)
                .reduce(Long::sum).orElse(0L);
    }
}
