import {Injectable} from '@angular/core';
import {waitFor} from '../../../utils';

export enum VatPreRegistrationInterval {
  QUARTER= 'QUARTER', MONTH = 'MONTH'
}

export interface VatAnnualCompletion extends VatAnnualCompletionUpdate {
  id: string;
  grossRevenue: number;
  vat: number;
  inputTax: number;
  reverseCharge: number;
  vatPayable: number;
}

export interface VatAnnualCompletionUpdate {
  year: number;
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
  async findAll(): Promise<VatAnnualCompletion[]>{
    await waitFor(200);
    return [
      {
        id: '1',
        year: 2020,
        taxAuthoritySubmitted: true,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '2',
        year: 2019,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '3',
        year: 2018,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
      {
        id: '4',
        year: 2017,
        taxAuthoritySubmitted: false,
        grossRevenue: 898623,
        vat: 0,
        inputTax: 7390,
        reverseCharge: 898623,
        vatPayable: -7390
      },
    ];
  }

  async add(add: VatAnnualCompletionUpdate): Promise<VatAnnualCompletion> {
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
  ): Promise<VatAnnualCompletionSimulation> {
    return {
      grossRevenue: 898623,
      vat: 0,
      inputTax: 7390,
      reverseCharge: 898623,
      vatPayable: -7390,
    };
  }
}
