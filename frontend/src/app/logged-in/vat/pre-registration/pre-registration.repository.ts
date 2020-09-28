import {Injectable} from '@angular/core';
import {waitFor} from '../../../utils';

export enum VatPreRegistrationInterval {
  QUARTER= 'QUARTER', MONTH = 'MONTH'
}

export interface VatPreRegistration extends VatPreRegistrationUpdate {
  id: string;
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
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
  async findYears(): Promise<number[]> {
    await waitFor(300);
    return [2020, 2019, 2018, 2017];
  }

  async findByYear(year: number): Promise<VatPreRegistration[]>{
    await waitFor(200);
    return [
      {
        id: '1',
        year: 2020,
        interval: VatPreRegistrationInterval.QUARTER,
        intervalValue: 1,
        taxAuthoritySubmitted: true,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '2',
        year: 2020,
        interval: VatPreRegistrationInterval.QUARTER,
        intervalValue: 2,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '3',
        year: 2020,
        interval: VatPreRegistrationInterval.MONTH,
        intervalValue: 9,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '4',
        year: 2020,
        interval: VatPreRegistrationInterval.MONTH,
        intervalValue: 12,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
    ];
  }

  async add(add: VatPreRegistrationUpdate): Promise<VatPreRegistration> {
    return {
      id: '123123',
      grossRevenue: 898623,
      vat: 0,
      inputTax: 7390,
      reverseCharge: 898623,
      vatPayable: -7390,
      ...add
    };
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
