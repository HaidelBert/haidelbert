import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getRegisterOfAssetsApiBaseUrl} from '../../../config/config';
import {Asset, CreateAsset} from './assets.repository';


export interface YearDepreciation{
  id: number;
  year: number;
  sumDepreciations: number;
}

@Injectable({
  providedIn: 'root'
})
export class YearDepreciationRepository {
  constructor(private httpClient: HttpClient) {}


  async add(year: number): Promise<void> {
    return await this.httpClient.post<void>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/year-depreciations?year=${year}`, {}).toPromise();
  }

  async list(): Promise<YearDepreciation[]> {
    return await this.httpClient.get<YearDepreciation[]>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/year-depreciations`, {}).toPromise();
  }
}
