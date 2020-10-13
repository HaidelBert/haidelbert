import {Component, Input} from '@angular/core';
import {AnnualFinancialStatement} from '../annual-financial-statement.repository';
import { formatMoney } from 'src/app/utils';
import {BaseComponent} from '../../../common/base-component';

@Component({
  selector: 'app-annual-financial-statements-details',
  templateUrl: './annual-financial-statements-details.component.html',
})
export class AnnualFinancialStatementsDetailsComponent extends BaseComponent{
  @Input() details: AnnualFinancialStatement;

  formatTotalExpenditure(): string {
    if (!this.details) {
      return '';
    }
    return formatMoney({ amount: this.details.sumGrossExpenditure, currency: 'EUR' });
  }

  formatTotalRevenue(): string {
    if (!this.details) {
      return '';
    }
    return formatMoney({amount: this.details.sumGrossRevenue, currency: 'EUR'});
  }

  get positions(): any[] {
    return Object.keys(this.details.details).map(key => {
      return {
        key,
        gross: this.details.details[key].gross,
        net: this.details.details[key].net,
      };
    });
  }
}
