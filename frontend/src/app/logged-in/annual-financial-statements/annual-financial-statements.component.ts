import {Component, OnInit} from '@angular/core';
import {AnnualFinancialStatement, AnnualFinancialStatementRepository} from './annual-financial-statement.repository';
import {formatMoney} from '../../utils';

@Component({
  selector: 'app-annual-financial-statements',
  templateUrl: './annual-financial-statements.component.html',
})
export class AnnualFinancialStatementsComponent implements OnInit{
  annualFinancialStatements: AnnualFinancialStatement[] = [];
  newOpen = false;
  details: AnnualFinancialStatement = undefined;

  constructor(private annualFinancialStatementRepository: AnnualFinancialStatementRepository) {
  }

  formatResult(data: AnnualFinancialStatement): string {
    return formatMoney({ amount: data.result, currency: 'EUR'  });
  }

  async ngOnInit(): Promise<void> {
    this.annualFinancialStatements = await this.annualFinancialStatementRepository.findAll();
  }

  getColorForResult(result: number): string {
    if (result < 0) {
      return 'red';
    }
    return 'green';
  }

  async showDetails(data: AnnualFinancialStatement): Promise<void> {
    this.details = await this.annualFinancialStatementRepository.findById(data.id);
  }

  closeDetails(): void {
    this.details = undefined;
  }

  closeNew(): void {
    this.newOpen = false;
  }
}
