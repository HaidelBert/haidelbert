import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Money, formatMoney, calculateNetAmount, getBase64} from '../../../../utils';
import currency from 'currency.js';
import {
  AccountingRecord,
  Category,
  categoryTranslations, isRevenueCategory,
  UpdateAccountingRecord
} from '../../accounting.repository';
import moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-accounting-table-row]',
  templateUrl: './accounting-table-row.component.html',
})
export class AccountingTableRowComponent implements OnChanges{
  @Input() data: AccountingRecord;
  @Input() onUpdate: (id: number, update: Partial<UpdateAccountingRecord>) => Promise<void>;
  @Input() onDelete: (id: number) => Promise<void>;
  @Output() download = new EventEmitter<number>();
  editCache: AccountingRecord;
  editBookingDate: Date;
  editing  = false;
  categories = Object.keys(Category).map(key => {
    return {
      key,
      label: categoryTranslations[key]
    };
  });
  receipt: File[] = [];

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
    this.editBookingDate = moment.unix(this.data.bookingDate).toDate();
    this.editing = false;
  }

  async saveEdit(): Promise<void> {
    if (!this.validateEditCache()) {
      return;
    }
    this.editCache.bookingDate = moment(this.editBookingDate).unix();
    const {
      id,
      ...rest
    } = this.editCache;
    if (this.receipt.length > 0) {
      (rest as any).receipt = await getBase64(this.receipt[0]);
    }
    await this.onUpdate(id, rest);
    this.data = this.editCache;
    this.editing = false;
    this.editCache = undefined;
  }

  translateCategory(category: Category): string {
    return categoryTranslations[category];
  }

  formatBookingDate(bookingDate: number): string {
    return moment.unix(bookingDate).format('DD.MM.YYYY');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.editBookingDate = moment.unix(this.data.bookingDate).toDate();
  }

  async deleteRecord(): Promise<void> {
    await this.onDelete(this.data.id);
  }

  async startDownload(): Promise<void> {
    this.download.emit(this.data.id);
  }

  handleGrossAmountChanged($event: FocusEvent): void {
    this.editCache.grossAmount = this.parseMoney($event);
    this.editCache.netAmount = this.calculateNetAmount(this.editCache.grossAmount, this.editCache.taxRate);
  }

  handleTaxRateChanged($event: FocusEvent): void {
    this.editCache.taxRate = parseInt(($event.target as any).value, 10);
    this.editCache.netAmount = this.calculateNetAmount(this.editCache.grossAmount, this.editCache.taxRate);
  }

  private validateEditCache(): boolean {
    if (!this.editCache) {
      return false;
    }
    return true;
  }

  beforeUpload = (file: File): boolean => {
    this.receipt = [file];
    return false;
  }
}
