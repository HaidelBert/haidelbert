import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {AnnualFinancialStatement, AnnualFinancialStatementRepository} from '../annual-financial-statement.repository';
import { formatMoney } from 'src/app/utils';
import {BaseComponent} from '../../../common/base-component';

@Component({
  selector: 'app-new-annual-financial-statement',
  templateUrl: './new-annual-financial-statement.component.html',
})
export class NewAnnualFinancialStatementComponent extends BaseComponent implements OnInit{
  newForm!: FormGroup;
  @Output() done: EventEmitter<boolean> = new EventEmitter<boolean>();
  newYear$ = new Subject<number>();
  saving: false;
  simulated: Partial<AnnualFinancialStatement> = undefined;

  constructor(private fb: FormBuilder, private annualFinancialRepository: AnnualFinancialStatementRepository) {
    super();
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

  formatTotalExpenditure(): string {
    if (!this.simulated) {
      return '';
    }
    return formatMoney({ amount: this.simulated.sumGrossExpenditure, currency: 'EUR' });
  }

  formatTotalRevenue(): string {
    if (!this.simulated) {
      return '';
    }
    return formatMoney({amount: this.simulated.sumGrossRevenue, currency: 'EUR'});
  }

  get positions(): any[] {
    return Object.keys(this.simulated.details).map(key => {
      return {
        key,
        gross: this.simulated.details[key].gross,
        net: this.simulated.details[key].net,
      };
    });
  }

  async add(): Promise<void> {
    await this.annualFinancialRepository.add(this.newForm.controls.year.value);
    this.done.emit(true);
  }
}
