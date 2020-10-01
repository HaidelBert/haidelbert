import {Injectable} from '@angular/core';
import {waitFor} from '../../utils';


export enum MoneyFlow {
  REVENUE= 'REVENUE', EXPENDITURE = 'EXPENDITURE'
}

export enum ReceiptType {
  CASH = 'CASH', BANK = 'BANK'
}

export enum Category {
  TAX_AUTHORITY_PAYMENT = 'TAX_AUTHORITY_PAYMENT',
  OFFICE_EXPENDITURE = 'OFFICE_EXPENDITURE',
  MARKETING = 'MARKETING',
  TRAVELLING = 'TRAVELLING',
  POST_PHONE = 'POST_PHONE',
  TRAINING = 'TRAINING',
  MISC_EXPENDITURE = 'MISC_EXPENDITURE',
  SVA = 'SVA',
  THIRD_PARTY_SERVICES = 'THIRD_PARTY_SERVICES',
  OFFICE_MATERIALS = 'OFFICE_MATERIALS',
  GWG = 'GWG',
  INTEREST_CHARGES = 'INTEREST_CHARGES',
  INSURANCE = 'INSURANCE',
  LITERATURE = 'LITERATURE',
  REVENUE_SERVICES = 'REVENUE_SERVICES',
  REVENUE_SELLS = 'REVENUE_SELLS',
}

export const categoryTranslations = {
  [Category.TAX_AUTHORITY_PAYMENT]: 'FA-Zahllast',
  [Category.OFFICE_EXPENDITURE]: 'Bürokosten',
  [Category.MARKETING]: 'Werbung',
  [Category.TRAVELLING]: 'Reisen Diäten',
  [Category.POST_PHONE]: 'Post Telefon',
  [Category.TRAINING]: 'Fortbildung',
  [Category.MISC_EXPENDITURE]: 'sonst. Gebühren',
  [Category.SVA]: 'SVA',
  [Category.THIRD_PARTY_SERVICES]: 'Fremdleistungen',
  [Category.OFFICE_MATERIALS]: 'Büromaterial',
  [Category.GWG]: 'GWG',
  [Category.INTEREST_CHARGES]: 'Zinsen Abgaben',
  [Category.INSURANCE]: 'Versicherung',
  [Category.LITERATURE]: 'Fachliteratur',
  [Category.REVENUE_SERVICES]: 'Einnahmen Dienstleistungen',
  [Category.REVENUE_SELLS]: 'Einnahmen Verkäufe',
};

export const revenueCategories: Category[] = [Category.REVENUE_SERVICES, Category.REVENUE_SELLS];

export const isRevenueCategory = (category: Category) => revenueCategories.some(value => value === category);

export interface UpdateAccountingRecord {
  bookingDate: string;
  description: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  currency: string;
  category: Category;
  reverseCharge: boolean;
}

export interface AccountingRecord {
  id: string;
  runningNumber: number;
  bookingDate: string;
  description: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  currency: string;
  category: Category;
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
        description: 'koajsd fkjasdflk ajksd',
        grossAmount: 12000,
        taxRate: 20,
        receiptType: ReceiptType.BANK,
        currency: 'EUR',
        category: Category.OFFICE_EXPENDITURE,
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
    await waitFor(5000);
    return Promise.resolve({
      id: '1',
      ...post
    } as AccountingRecord);
  }

}
