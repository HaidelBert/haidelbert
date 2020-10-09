import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getAccountingApiBaseUrl, getAnnualFinancialStatementsApiBaseUrl} from '../../../config/config';
import {AccountingRecord} from '../accounting/accounting.repository';

export interface AnnualFinancialStatement {
  id: string;
  year: number;
  result: number;
  details?: AnnualFinancialStatementDetails;
  taxAuthoritySubmitted: boolean;
}

export interface AnnualFinancialStatementDetails {
  expenditure: {
    [key: string]: number;
  };
  revenue: {
    [key: string]: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnnualFinancialStatementRepository {
  constructor(private httpClient: HttpClient) {}

  async findAll(): Promise<AnnualFinancialStatement[]> {
    return await this.httpClient.get<AnnualFinancialStatement[]>(`${getAnnualFinancialStatementsApiBaseUrl()}/annual-financial-statements/api/protected/annual-financial-statements`).toPromise();
  }

  findById(id: string): Promise<AnnualFinancialStatement> {
    return Promise.resolve({
      id: '123',
      year: 2020,
      result: 800000,
      taxAuthoritySubmitted: false,
      details: {
        expenditure: {
          9223: 90000,
          9225: 100000
        },
        revenue: {
          Einnahmen: 9990000,
          Umsatzerlöse: 1000000
        }
      }
    });
  }

  async simulate(year: number): Promise<Partial<AnnualFinancialStatement>> {
    return {
      year,
      result: 800000,
      details: {
        expenditure: {
          9223: 90000,
          9225: 100000
        },
        revenue: {
          Einnahmen: 9990000,
          Umsatzerlöse: 1000000
        }
      }
    };
  }
}
