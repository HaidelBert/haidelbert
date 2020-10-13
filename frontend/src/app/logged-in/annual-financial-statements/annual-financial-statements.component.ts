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

  constructor(private annualFinancialStatementRepository: AnnualFinancialStatementRepository) {}

  formatResult(data: AnnualFinancialStatement): string {
    return formatMoney({ amount: data.result, currency: 'EUR'  });
  }

  async ngOnInit(): Promise<void> {
    await this.refresh();
  }

  async refresh(): Promise<void> {
    this.annualFinancialStatements = await this.annualFinancialStatementRepository.findAll();
  }

  getColorForResult(result: number): string {
    if (result < 0) {
      return 'red';
    }
    return 'green';
  }

  showDetails(data: AnnualFinancialStatement): void {
    this.details = data;
  }

  closeDetails(): void {
    this.details = undefined;
  }

  closeNew(): void {
    this.newOpen = false;
  }

  async handleDone($event: boolean): Promise<void> {
    if ($event) {
      await this.refresh();
    }
    this.newOpen = false;
  }

  async markDone(id: number): Promise<void> {
    await this.annualFinancialStatementRepository.markTaxAuthoritySubmitted(id);
    await this.refresh();
  }
}
