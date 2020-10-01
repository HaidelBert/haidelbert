import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewContainerRef} from '@angular/core';
import {Money, formatMoney, calculateNetAmount} from '../../../../utils';
import currency from 'currency.js';
import {
  AccountingRecord,
  Category,
  categoryTranslations, isRevenueCategory,
  MoneyFlow,
  revenueCategories,
  UpdateAccountingRecord
} from '../../accounting.repository';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-accounting-table-row]',
  templateUrl: './accounting-table-row.component.html',
})
export class AccountingTableRowComponent {
  @Input() data: AccountingRecord;
  @Input() onUpdate: (update: Partial<UpdateAccountingRecord>) => Promise<void>;
  editCache: AccountingRecord;
  editing  = false;
  categories = Object.keys(Category).map(key => {
    return {
      key,
      label: categoryTranslations[key]
    };
  });

  formatMoney(money: Money): string {
    return formatMoney(money);
  }

  calculateNetAmount(amount: number, taxRate: number): number {
    return calculateNetAmount(amount, taxRate);
  }

  parseMoney(event: FocusEvent): number {
    return currency((event.target as any).value).intValue;
  }

  parseInt(value: string): number {
    return parseInt(value, 10);
  }

  getColorForTag(data: AccountingRecord): string {
    if (isRevenueCategory(data.category)) {
      return 'green';
    }
    return 'red';
  }

  reverseChargeChanged(value: boolean): void {
    if (value) {
      this.editCache.taxRate = 0;
    }
  }

  getNetAmount(data: AccountingRecord): string {
    return formatMoney({
      amount: calculateNetAmount(this.editCache.grossAmount, this.editCache.taxRate),
      currency: 'EUR'
    });
  }

  startEdit(): void {
    this.editCache = Object.assign({}, this.data);
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  async saveEdit(): Promise<void> {
    const {
      id,
      ...rest
    } = this.editCache;
    await this.onUpdate(rest);
    this.data = this.editCache;
    this.editing = false;
    this.editCache = undefined;
  }

  translateCategory(category: Category): string {
    return categoryTranslations[category];
  }
}
