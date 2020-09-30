import {Component, Input} from '@angular/core';
import {AnnualFinancialStatement} from '../annual-financial-statement.repository';
import { formatMoney } from 'src/app/utils';

@Component({
  selector: 'app-annual-financial-statements-details',
  templateUrl: './annual-financial-statements-details.component.html',
})
export class AnnualFinancialStatementsDetailsComponent {
  @Input() details: AnnualFinancialStatement;

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }

  formatTotalExpenditure(): string {
    if (!this.details) {
      return '';
    }
    const expenditures =  Object.keys(this.details.details.expenditure)
      .map(key => this.details.details.expenditure[key])
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    return formatMoney({ amount: expenditures, currency: 'EUR' });
  }

  formatTotalRevenue(): string {
    if (!this.details) {
      return '';
    }
    const revenues =  Object.keys(this.details.details.revenue)
      .map(key => this.details.details.revenue[key])
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    return formatMoney({ amount: revenues, currency: 'EUR' });
  }

  get revenues(): any[] {
    return Object.keys(this.details.details.revenue)
      .map(key => {
        const value = this.details.details.revenue[key];
        return {
          key,
          value
        };
    });
  }

  get expenditures(): any[] {
    return Object.keys(this.details.details.expenditure)
      .map(key => {
        const value = this.details.details.expenditure[key];
        return {
          key,
          value
        };
      });
  }
}
