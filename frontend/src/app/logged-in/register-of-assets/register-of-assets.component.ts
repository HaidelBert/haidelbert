import {Component, OnInit} from '@angular/core';
import {Asset, AssetsRepository} from './assets.repository';
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
  newYearlyOpen = false;

  constructor(private registerOfAssetsRepository: AssetsRepository) {
  }

  async ngOnInit(): Promise<void> {
    this.registerOfAssets = (await this.registerOfAssetsRepository.findAll()).map(value => {
      return {
        data: value,
        expand: false,
      };
    });
  }

  formatDate(purchaseDate: string): string {
    return moment(purchaseDate).format('DD.MM.YYYY');
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

  openNewYearly(): void {
    this.newYearlyOpen = true;
  }

  closeNewYearly(): void {
    this.newYearlyOpen = false;
  }

  handleNewYearDone(result: boolean): void {
    this.closeNewYearly();
  }
}
