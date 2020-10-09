import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AnnualFinancialStatement, AnnualFinancialStatementRepository} from '../annual-financial-statement.repository';
import { formatMoney } from 'src/app/utils';

@Component({
  selector: 'app-new-annual-financial-statement',
  templateUrl: './new-annual-financial-statement.component.html',
})
export class NewAnnualFinancialStatementComponent implements OnInit{
  newForm!: FormGroup;
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>();
  newYear$ = new Subject<number>();
  saving: false;
  simulated: Partial<AnnualFinancialStatement> = undefined;

  constructor(private fb: FormBuilder, private annualFinancialRepository: AnnualFinancialStatementRepository) {
    this.newForm = this.fb.group({
      year: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.newYear$.subscribe((value) => {
      if (value && value.toString(10).length === 4) {
        this.simulate();
      }
    });
  }

  async simulate(): Promise<void> {
    this.simulated = await this.annualFinancialRepository.simulate(this.newForm.controls.year.value);
  }

  submitForm($event: any): void {
    $event.preventDefault();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsDirty();
      this.newForm.controls[key].updateValueAndValidity();
    });
    if (!this.newForm.valid) {
      return;
    }
    this.clearForm();
    this.done.emit(true);
  }

  clearForm(): void {
    this.newForm.reset();
  }

  handleCancel(): void {
    this.clearForm();
    this.done.emit(false);
  }

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }

  formatTotalExpenditure(): string {
    if (!this.simulated) {
      return '';
    }
    const expenditures =  Object.keys(this.simulated.details.expenditure)
      .map(key => this.simulated.details.expenditure[key])
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    return formatMoney({ amount: expenditures, currency: 'EUR' });
  }

  formatTotalRevenue(): string {
    if (!this.simulated) {
      return '';
    }
    const revenues =  Object.keys(this.simulated.details.revenue)
      .map(key => this.simulated.details.revenue[key])
      .reduce((previousValue, currentValue) => previousValue + currentValue);

    return formatMoney({ amount: revenues, currency: 'EUR' });
  }

  get revenues(): any[] {
    return Object.keys(this.simulated.details.revenue)
      .map(key => {
        const value = this.simulated.details.revenue[key];
        return {
          key,
          value
        };
      });
  }

  get expenditures(): any[] {
    return Object.keys(this.simulated.details.expenditure)
      .map(key => {
        const value = this.simulated.details.expenditure[key];
        return {
          key,
          value
        };
      });
  }
}
