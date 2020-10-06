import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { formatMoney } from 'src/app/utils';
import {Subject} from 'rxjs';
import {
  PreRegistrationRepository,
  VatPreRegistrationInterval,
  VatPreRegistrationSimulation,
  VatPreRegistrationUpdate
} from '../pre-registration.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-vat-new-pre-registration',
  templateUrl: './new-pre-registration.component.html',
})
export class NewPreRegistrationComponent implements OnInit{
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  selectedInterval$ = new Subject<VatPreRegistrationInterval>();
  selectedQuarter$ = new Subject<number>();
  selectedMonth$ = new Subject<number>();
  newYear$ = new Subject<number>();
  simulated: VatPreRegistrationSimulation = undefined;
  newForm!: FormGroup;
  months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  saving: false;

  constructor(private fb: FormBuilder, private preRegistrationRepository: PreRegistrationRepository) {
    this.newForm = this.fb.group({
      year: ['', [Validators.required]],
      interval: ['', [Validators.required]],
      quarter: ['', []],
      month: ['', []],
    });
  }

  async submitForm($event: any): Promise<void>{
    $event.preventDefault();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsDirty();
      this.newForm.controls[key].updateValueAndValidity();
    });
    if (!this.newForm.valid) {
      return;
    }
    await this.preRegistrationRepository.add(this.fromForm());
    this.clearForm();
  }

  fromForm(): VatPreRegistrationUpdate {
    return {
      year: this.newForm.controls.year.value,
      interval: this.newForm.controls.interval.value,
      intervalValue:
      // tslint:disable-next-line:max-line-length
        this.newForm.controls.interval.value === VatPreRegistrationInterval.QUARTER ? this.newForm.controls.quarter.value : this.newForm.controls.month.value,
      taxAuthoritySubmitted: false,
    };
  }

  get isQuarterMode(): boolean {
    return this.newForm.controls.interval.value === VatPreRegistrationInterval.QUARTER;
  }

  get isMonthMode(): boolean {
    return this.newForm.controls.interval.value === VatPreRegistrationInterval.MONTH;
  }

  async ngOnInit(): Promise<void> {
    this.selectedInterval$.subscribe(() => {
      this.simulate();
    });
    this.selectedQuarter$.subscribe(() => {
      this.simulate();
    });
    this.selectedMonth$.subscribe(() => {
      this.simulate();
    });
    this.newYear$.subscribe(() => {
      this.simulate();
    });
  }

  async simulate(): Promise<void> {
    this.simulated = await this.preRegistrationRepository
      .simulate(
        this.newForm.controls.year.value,
        this.newForm.controls.interval.value,
        this.newForm.controls.quarter.value,
        this.newForm.controls.month.value
      );
  }

  formatMonth(m: number): string {
    const date = new Date(2020, m - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  }

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }

  clearForm(): void {
    this.newForm.reset();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsUntouched();
      this.newForm.controls[key].markAsPristine();
      this.newForm.controls[key].updateValueAndValidity();
    });
  }

  handleCancel(): void {
    this.clearForm();
    this.cancel.emit();
  }
}
