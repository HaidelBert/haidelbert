import Dinero from 'dinero.js';

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
