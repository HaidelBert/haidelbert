import Dinero from 'dinero.js';
import {FormGroup} from '@angular/forms';

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
