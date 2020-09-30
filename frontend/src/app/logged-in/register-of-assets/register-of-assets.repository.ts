import {Injectable} from '@angular/core';

export interface Asset{
  id: string;
  name: string;
  purchaseDate: number;
  grossAmount: number;
  netAmount: number;
  depreciationDuration: number;
  netRemainingBlockValue: number;
  depreciations: Depreciation[];
  active: boolean;
}

export interface Depreciation {
  id: string;
  year: number;
  netDepreciationAmount: number;
  netRemainingBlockValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterOfAssetsRepository {
  findAll(): Promise<Asset[]> {
    return Promise.resolve([
      {
        id: '1',
        name: 'MacBook Pro 2020',
        purchaseDate: 1601438408,
        grossAmount: 1200000,
        netAmount: 1000000,
        depreciationDuration: 3,
        netRemainingBlockValue: 666667,
        depreciations: [
          {
            id: '123',
            year: 2019,
            netDepreciationAmount: 333333,
            netRemainingBlockValue: 666667
          }
        ],
        active: true,
      }
    ]);
  }
}
