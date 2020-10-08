import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getRegisterOfAssetsApiBaseUrl} from '../../../config/config';

export interface Asset{
  id: string;
  name: string;
  purchaseDate: string;
  grossAmount: number;
  netAmount: number;
  depreciationDuration: number;
  netRemainingBlockValue: number;
  depreciations: Depreciation[];
  active: boolean;
}

export interface CreateAsset {
  name: string;
  purchaseDate: Date;
  grossAmount: number;
  netAmount: number;
  depreciationDuration: number;
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
export class AssetsRepository {

  constructor(private httpClient: HttpClient) {}

  async findAll(): Promise<Asset[]> {
    return await this.httpClient.get<Asset[]>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/assets`).toPromise();
  }

  async add(add: CreateAsset): Promise<Asset> {
    return await this.httpClient.post<Asset>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/assets`, add).toPromise();
  }
}
