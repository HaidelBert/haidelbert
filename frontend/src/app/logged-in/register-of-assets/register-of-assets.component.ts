import {Component, OnInit} from '@angular/core';
import {Asset, RegisterOfAssetsRepository} from './register-of-assets.repository';
import moment from 'moment';
import {formatMoney} from '../../utils';

interface ExpandableRow<T> {
  data: T;
  expand: boolean;
}

@Component({
  selector: 'app-register-of-assets',
  templateUrl: './register-of-assets.component.html',
})
export class RegisterOfAssetsComponent implements OnInit{
  newOpen = false;
  registerOfAssets: ExpandableRow<Asset>[] = [];
  sellAsset: Asset = undefined;

  constructor(private registerOfAssetsRepository: RegisterOfAssetsRepository) {
  }

  async ngOnInit(): Promise<void> {
    this.registerOfAssets = (await this.registerOfAssetsRepository.findAll()).map(value => {
      return {
        data: value,
        expand: false,
      };
    });
  }

  formatDate(purchaseDate: number): string {
    return moment.unix(purchaseDate).format('DD.MM.YYYY');
  }

  formatMoney(amount: number): string {
    return formatMoney({ amount, currency: 'EUR' });
  }

  closeNew(): void {
    this.newOpen = false;
  }

  openSellAsset(asset: Asset): void {
    this.sellAsset = asset;
  }

  closeSellAsset(): void {
    this.sellAsset = undefined;
  }
}
