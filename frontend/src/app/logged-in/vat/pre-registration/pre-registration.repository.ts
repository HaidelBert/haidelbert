import {Injectable} from '@angular/core';
import {waitFor} from '../../../utils';
import {HttpClient} from '@angular/common/http';
import {getVatApiBaseUrl} from '../../../../config/config';

export enum VatPreRegistrationInterval {
  QUARTER= 'QUARTER', MONTH = 'MONTH'
}

export interface VatPreRegistration {
  id: string;
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

export interface VatPreRegistrationUpdate {
  year: number;
  interval: VatPreRegistrationInterval;
  intervalValue: number;
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

  async add(add: VatPreRegistrationUpdate): Promise<VatPreRegistration> {
    return await this.httpClient.post<VatPreRegistration>(`${getVatApiBaseUrl()}/vat/api/protected/pre-registration`, add).toPromise();
  }

  async simulate(
    year: number,
    interval: VatPreRegistrationInterval,
    quarter: number,
    month: number
  ): Promise<VatPreRegistrationSimulation> {
    return {
      grossRevenue: 898623,
      vat: 0,
      inputTax: 7390,
      reverseCharge: 898623,
      vatPayable: -7390,
    };
  }
}
