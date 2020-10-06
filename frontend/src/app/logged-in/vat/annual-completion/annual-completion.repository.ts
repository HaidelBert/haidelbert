import {Injectable} from '@angular/core';
import {getVatApiBaseUrl} from '../../../../config/config';
import {HttpClient} from '@angular/common/http';

export enum VatPreRegistrationInterval {
  QUARTER= 'QUARTER', MONTH = 'MONTH'
}

export interface VatAnnualCompletion {
  id: number;
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
  year: number;
  taxAuthoritySubmitted: boolean;
}

export interface VatAnnualCompletionCreate {
  year: number;
  taxAuthoritySubmitted: boolean;
}

export interface VatAnnualCompletionUpdate {
  taxAuthoritySubmitted: boolean;
}

export interface VatAnnualCompletionSimulation {
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
}


@Injectable({
  providedIn: 'root'
})
export class AnnualCompletionRepository {


  constructor(private httpClient: HttpClient) {}

  async findAll(): Promise<VatAnnualCompletion[]>{
    return await this.httpClient
      .get<VatAnnualCompletion[]>(`${getVatApiBaseUrl()}/vat/api/protected/annual-completion`).toPromise();
  }

  async add(add: VatAnnualCompletionCreate): Promise<VatAnnualCompletion> {
    return await this.httpClient.post<VatAnnualCompletion>(`${getVatApiBaseUrl()}/vat/api/protected/annual-completion`, add).toPromise();
  }

  async simulate(year: number): Promise<VatAnnualCompletionSimulation> {
    return await this.httpClient.post<VatAnnualCompletionSimulation>(`${getVatApiBaseUrl()}/vat/api/protected/annual-completion/simulate?year=${year}`, {}).toPromise();
  }

  async change(id: number, change: VatAnnualCompletionUpdate): Promise<void> {
    return await this.httpClient.patch<void>(`${getVatApiBaseUrl()}/vat/api/protected/annual-completion/${id}`, change).toPromise();
  }
}
