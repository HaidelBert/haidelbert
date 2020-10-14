import Dinero from 'dinero.js';
import {FormGroup, Validators} from '@angular/forms';

export const numberRegEx = /^(\-|\+)?([0-9]+(\.[0-9]+)?)$/;

export async function waitFor(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

export interface Money {
  amount: number;
  currency: string;
}

export function formatMoney(money: Money): string {
  return Dinero({ amount: money.amount, currency: money.currency }).toFormat();
}

export function calculateNetAmount(amount: number, taxRate: number): number {
  return Math.round((amount / ((taxRate + 100) / 100)));
}

export function clearForm(form: FormGroup): void {
  form.reset();
  Object.keys(form.controls).forEach(key => {
    form.controls[key].markAsUntouched();
    form.controls[key].markAsPristine();
    form.controls[key].updateValueAndValidity();
  });
}

export function isValidNumber(value: any): boolean {
  if (typeof value === 'number') {
    return true;
  }
  if (typeof value !== 'string') {
    return false;
  }
  return numberRegEx.test(value);
}

export function getBase64(img: File): Promise<string> {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result.toString()));
    reader.readAsDataURL(img);
  });
}
