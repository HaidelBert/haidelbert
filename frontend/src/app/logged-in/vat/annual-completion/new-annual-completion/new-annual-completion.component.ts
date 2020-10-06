import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { formatMoney } from 'src/app/utils';
import {Subject} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AnnualCompletionRepository, VatAnnualCompletionSimulation} from '../annual-completion.repository';

@Component({
  selector: 'app-vat-new-annual-completion',
  templateUrl: './new-annual-completion.component.html',
})
export class NewAnnualCompletionComponent implements OnInit{
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  newYear$ = new Subject<number>();
  simulated: VatAnnualCompletionSimulation = undefined;
  newForm!: FormGroup;
  saving: false;

  constructor(private fb: FormBuilder, private annualCompletionRepository: AnnualCompletionRepository) {
    this.newForm = this.fb.group({
      year: ['', [Validators.required]],
    });
  }

  async submitForm($event: any): Promise<void> {
    $event.preventDefault();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsDirty();
      this.newForm.controls[key].updateValueAndValidity();
    });
    if (!this.newForm.valid) {
      return;
    }
    await this.annualCompletionRepository.add({
      year: this.newForm.controls.year.value,
      taxAuthoritySubmitted: false,
    });
    this.clearForm();
  }

  async ngOnInit(): Promise<void> {
    this.newYear$.subscribe((value) => {
      if (value && value.toString(10).length === 4) {
        this.simulate();
      }
    });
  }

  async simulate(): Promise<void> {
    this.simulated = await this.annualCompletionRepository.simulate(this.newForm.controls.year.value);
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
