package io.haidelbert.domain.preRegistration;

import io.haidelbert.backends.accounting.AccountingRecord;
import io.haidelbert.backends.accounting.Category;
import io.haidelbert.backends.accounting.ReceiptType;
import io.haidelbert.config.ServiceCredentials;
import io.haidelbert.domain.AuthContext;
import io.haidelbert.domain.UserContext;
import io.haidelbert.domain.preRegistration.create.CreatePreRegistrationFactory;
import io.haidelbert.domain.preRegistration.create.TimeConstraints;
import io.haidelbert.domain.preRegistration.model.CreatePreRegistration;
import io.haidelbert.persistence.Interval;
import io.haidelbert.persistence.PreRegistrationRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.mockito.Matchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class ServiceTest {

    @Test
    public void testOk() {
        var accountingRecordClientList = mock(AccountingRecordListClient.class);
        when(accountingRecordClientList.list(any(AuthContext.class), any(TimeConstraints.class)))
                .thenReturn(List.of(new AccountingRecord(1L, 1L, 1L, "", 12000L, 20, ReceiptType.CASH, Category.OFFICE_EXPENDITURE, false)));
        var repository = mock(PreRegistrationRepository.class);
        var factory = new CreatePreRegistrationFactory(repository);
        var sut = new Service(new ServiceCredentials("", ""), accountingRecordClientList, factory, repository);

        var actual = sut.addPreRegistration(new UserContext("1", "asdf"), new CreatePreRegistration(2020, Interval.QUARTER, 1, false));

        Assertions.assertEquals(12000L, actual.getGrossExpenditure());
        Assertions.assertEquals(0L, actual.getGrossRevenue());
        Assertions.assertEquals(2000L, actual.getInputTax());
    }
}
