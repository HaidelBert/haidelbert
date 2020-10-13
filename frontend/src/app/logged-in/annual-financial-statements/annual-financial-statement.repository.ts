import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getAnnualFinancialStatementsApiBaseUrl} from '../../../config/config';

export interface AnnualFinancialStatement {
  id: number;
  year: number;
  sumGrossExpenditure: number;
  sumNetExpenditure: number;
  sumGrossRevenue: number;
  sumNetRevenue: number;
  result: number;
  details: {
    [key: string]: {
      gross: number;
      net: number;
    };
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

  async simulate(year: number): Promise<Partial<AnnualFinancialStatement>> {
    return await this.httpClient.post<Partial<AnnualFinancialStatement>>(`${getAnnualFinancialStatementsApiBaseUrl()}/annual-financial-statements/api/protected/annual-financial-statements/simulate?year=${year}`, {}).toPromise();
  }

  async add(year: number): Promise<AnnualFinancialStatement> {
    return await this.httpClient.post<AnnualFinancialStatement>(`${getAnnualFinancialStatementsApiBaseUrl()}/annual-financial-statements/api/protected/annual-financial-statements?year=${year}`, {}).toPromise();
  }

  async markTaxAuthoritySubmitted(id: number): Promise<void> {
    await this.httpClient.patch<void>(`${getAnnualFinancialStatementsApiBaseUrl()}/annual-financial-statements/api/protected/annual-financial-statements/${id}`, {
      taxAuthoritySubmitted: true
    }).toPromise();
  }
}
