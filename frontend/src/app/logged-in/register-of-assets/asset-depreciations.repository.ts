import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {getRegisterOfAssetsApiBaseUrl} from '../../../config/config';


export interface AssetDepreciationPreview {
  name: string;
  netDepreciationAmount: number;
  netRemainingBlockValue: number;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AssetDepreciationsRepository {
  constructor(private httpClient: HttpClient) {}

  async preview(year: number): Promise<AssetDepreciationPreview[]> {
    return await this.httpClient.post<AssetDepreciationPreview[]>(`${getRegisterOfAssetsApiBaseUrl()}/register-of-assets/api/protected/asset-depreciations/preview?year=${year}`, {}).toPromise();
  }
}
