import {Injectable} from '@angular/core';
import {waitFor} from '../../../utils';
import {HttpClient} from '@angular/common/http';
import {getVatApiBaseUrl} from '../../../../config/config';

export enum VatPreRegistrationInterval {
  QUARTER= 'QUARTER', MONTH = 'MONTH'
}

export interface VatPreRegistration {
  id: number;
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
  interval: VatPreRegistrationInterval;
  quarter: number;
  month: number;
  taxAuthoritySubmitted: boolean;
  year: number;
}

export interface VatPreRegistrationCreate {
  year: number;
  interval: VatPreRegistrationInterval;
  intervalValue: number;
  taxAuthoritySubmitted: boolean;
}

export interface VatPreRegistrationUpdate {
  taxAuthoritySubmitted: boolean;
}

export interface VatPreRegistrationSimulation {
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
}


@Injectable({
  providedIn: 'root'
})
export class PreRegistrationRepository {

  constructor(private httpClient: HttpClient) {}

  async findYears(): Promise<number[]> {
    return await this.httpClient
      .get<number[]>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration/years`).toPromise();
  }

  async findByYear(year: number): Promise<VatPreRegistration[]>{
    return await this.httpClient
      .get<VatPreRegistration[]>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration?year=${year}`).toPromise();
  }

  async add(add: VatPreRegistrationCreate): Promise<VatPreRegistration> {
    return await this.httpClient.post<VatPreRegistration>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration`, add).toPromise();
  }

  async simulate(
    year: number,
    interval: VatPreRegistrationInterval,
    intervalValue: number,
  ): Promise<VatPreRegistrationSimulation> {
    return await this.httpClient.post<VatPreRegistrationSimulation>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration/simulate`, {
      year,
      interval,
      intervalValue,
    }).toPromise();
  }

  async change(id: number, change: VatPreRegistrationUpdate): Promise<void> {
    return await this.httpClient.patch<void>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration/${id}`, change).toPromise();
  }
}
