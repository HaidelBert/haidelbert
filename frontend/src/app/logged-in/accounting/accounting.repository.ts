import {Injectable} from '@angular/core';
import {waitFor} from '../../utils';
import {HttpClient} from '@angular/common/http';
import {getAccountingApiBaseUrl} from '../../../config/config';


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
  bookingDate: number;
  name: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  category: Category;
  reverseCharge: boolean;
}

export interface AccountingRecord {
  id: number;
  runningNumber: number;
  bookingDate: number;
  name: string;
  grossAmount: number;
  taxRate: number;
  receiptType: ReceiptType;
  category: Category;
  reverseCharge: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AccountingRecordRepository {

  constructor(private httpClient: HttpClient) {}

  public async find(year: number, quarter?: number, month?: number): Promise<AccountingRecord[]> {
    return await this.httpClient.get<AccountingRecord[]>(`${getAccountingApiBaseUrl()}/accounting/api/protected/`).toPromise();
  }

  public async findByDescription(name: string): Promise<AccountingRecord[]> {
    return await this.httpClient.get<AccountingRecord[]>(`${getAccountingApiBaseUrl()}/accounting/api/protected/?name=${name}`).toPromise();
  }

  public async patch(id: number, patch: Partial<UpdateAccountingRecord>): Promise<void> {
    await this.httpClient.patch<void>(`${getAccountingApiBaseUrl()}/accounting/api/protected/${id}`, patch).toPromise();
  }

  public async post(post: UpdateAccountingRecord): Promise<AccountingRecord> {
    return await this.httpClient.post<AccountingRecord>(`${getAccountingApiBaseUrl()}/accounting/api/protected/`, post).toPromise();
  }

  async delete(id: number): Promise<void> {
    await this.httpClient.delete<void>(`${getAccountingApiBaseUrl()}/accounting/api/protected/${id}`).toPromise();
  }
}
