import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getRegisterOfAssetsApiBaseUrl} from '../../../config/config';
import {Asset, CreateAsset} from './assets.repository';

@Injectable({
  providedIn: 'root'
})
export class YearDepreciationRepository {
  constructor(private httpClient: HttpClient) {}


  async add(year: number): Promise<Asset> {
    return await this.httpClient.post<Asset>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/year-depreciations?year=${year}`, {}).toPromise();
  }
}
