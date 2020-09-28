import {Injectable} from '@angular/core';
import {RecordCategory} from './record-category.repository';
import {waitFor} from '../../utils';


export enum MoneyFlow {
  REVENUE= 'REVENUE', EXPENDITURE = 'EXPENDITURE'
}

export enum ReceiptType {
  CASH = 'CASH', BANK = 'BANK'
}

export interface UpdateAccountingRecord {
  bookingDate: string;
  moneyFlow: MoneyFlow;
  description: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  currency: string;
  categoryId: string;
  reverseCharge: boolean;
}

export interface AccountingRecord {
  id: string;
  runningNumber: number;
  bookingDate: string;
  moneyFlow: MoneyFlow;
  description: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  currency: string;
  category: RecordCategory;
  reverseCharge: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountingRecordRepository {

  public find(year: number, quarter?: number, month?: number): Promise<AccountingRecord[]> {
    const data = [];
    for (let i = 0; i < 50; i++) {
      data.push({
        id: `${i}`,
        runningNumber: null,
        bookingDate: '01.01.2020',
        moneyFlow: MoneyFlow.EXPENDITURE,
        description: 'koajsd fkjasdflk ajksd',
        grossAmount: 12000,
        taxRate: 20,
        receiptType: ReceiptType.BANK,
        currency: 'EUR',
        category: {
          id: '1',
          name: 'Bürokosten',
        },
        reverseCharge: true
      });
    }
    return Promise.resolve(data);
  }

  public findByDescription(description: string): Promise<AccountingRecord[]> {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: `${i}`,
        runningNumber: null,
        bookingDate: '01.01.2020',
        moneyFlow: MoneyFlow.EXPENDITURE,
        description: 'koajsd fkjasdflk ajksd',
        grossAmount: 12000,
        taxRate: 20,
        receiptType: ReceiptType.BANK,
        currency: 'EUR',
        category: {
          id: '1',
          name: 'Bürokosten',
        },
        reverseCharge: true
      });
    }
    return Promise.resolve(data);
  }

  public async patch(patch: Partial<UpdateAccountingRecord>): Promise<void> {
    await waitFor(500);
    return Promise.resolve();
  }

  public async post(post: UpdateAccountingRecord): Promise<AccountingRecord> {
    const {
      categoryId,
      ...rest
    } = post;
    await waitFor(5000);
    return Promise.resolve({
      id: '1',
      category: {
        id: '1',
        name: 'Bürokosten',
      },
      ...rest
    } as AccountingRecord);
  }

}
