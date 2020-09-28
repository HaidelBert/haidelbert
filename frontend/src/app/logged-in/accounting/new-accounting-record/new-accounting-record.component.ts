import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AccountingRecord, AccountingRecordRepository, UpdateAccountingRecord} from '../accounting.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {calculateNetAmount, formatMoney} from '../../../utils';
import currency from 'currency.js';
import {RecordCategory, RecordCategoryRepository} from '../record-category.repository';
import {NzAutocompleteOptionComponent} from 'ng-zorro-antd';

@Component({
  selector: 'app-new-accounting-record',
  templateUrl: './new-accounting-record.component.html',
  styleUrls: ['./new-accounting-record.component.less']
})
export class NewAccountingRecordComponent {
  descriptionSuggestions: AccountingRecord[] = [];
  newForm!: FormGroup;
  saving = false;
  @Input() onClose: () => void;
  @Output() cancelEmitter = new EventEmitter<void>();
  @Output() successEmitter = new EventEmitter<void>();
  compareCategories = (c1: RecordCategory, c2: RecordCategory) => (c1 && c2 ? c1.id === c2.id : c1 === c2);

  constructor(
    private fb: FormBuilder,
    private accountingRecordRepository: AccountingRecordRepository,
    private recordCategoryRepository: RecordCategoryRepository
  ) {
    this.newForm = this.fb.group({
      bookingDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      receiptType: [undefined, [Validators.required]],
      moneyFlow: [undefined, [Validators.required]],
      reverseCharge: [true, [Validators.required]],
      grossAmount: [undefined, [Validators.required]],
      taxRate: [undefined, [Validators.required]],
      category: [undefined, [Validators.required]],
    });
  }

  async handleDescriptionChange(value: string): Promise<void> {
    if (!value || value.length < 4) {
      this.descriptionSuggestions = [];
      return;
    }
    this.descriptionSuggestions = await this.accountingRecordRepository.findByDescription(value);
  }

  get netAmount(): string {
    if (!this.newForm.controls.grossAmount.value || !this.newForm.controls.taxRate.value) {
      return formatMoney({ amount: 0, currency: 'EUR' });
    }
    return formatMoney({
      amount: calculateNetAmount(
        currency(this.newForm.controls.grossAmount.value).intValue,
        parseInt(this.newForm.controls.taxRate.value, 10)
      ),
      currency: 'EUR'
    });
  }

  get categories(): RecordCategory[] {
    return this.recordCategoryRepository.categories;
  }

  get categoriesLoading(): boolean {
    return this.recordCategoryRepository.categoriesLoaded;
  }

  descriptionSelected($event: NzAutocompleteOptionComponent): void {
    const template: AccountingRecord = $event.nzValue;
    this.newForm.controls.description.setValue(template.description);
    this.newForm.controls.receiptType.setValue(template.receiptType);
    this.newForm.controls.moneyFlow.setValue(template.moneyFlow);
    this.newForm.controls.reverseCharge.setValue(template.reverseCharge);
    this.newForm.controls.taxRate.setValue(template.taxRate);
    this.newForm.controls.category.setValue(template.category);
  }

  clearForm(): void {
    this.newForm.reset();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsUntouched();
      this.newForm.controls[key].markAsPristine();
      this.newForm.controls[key].updateValueAndValidity();
    });
  }

  enableControls(enabled: boolean): void {
    Object.keys(this.newForm.controls).forEach(key => {
     if (enabled) {
       this.newForm.controls[key].enable();
     } else {
       this.newForm.controls[key].disable();
     }
    });
  }

  private mapFromForm(): UpdateAccountingRecord {
    return {
      bookingDate: this.newForm.controls.bookingDate.value,
      description: this.newForm.controls.description.value,
      receiptType: this.newForm.controls.receiptType.value,
      moneyFlow: this.newForm.controls.moneyFlow.value,
      reverseCharge: this.newForm.controls.reverseCharge.value,
      grossAmount: this.newForm.controls.grossAmount.value,
      taxRate: this.newForm.controls.taxRate.value,
      categoryId: this.newForm.controls.category.value.id,
      currency: 'EUR'
    };
  }

  async submitForm(e: any): Promise<void> {
    e.preventDefault();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsDirty();
      this.newForm.controls[key].updateValueAndValidity();
    });
    if (!this.newForm.valid) {
      return;
    }
    this.saving = true;
    this.enableControls(false);
    try {
      await this.accountingRecordRepository.post(this.mapFromForm());
      this.clearForm();
      this.successEmitter.emit();
    }finally {
      this.saving = false;
      this.enableControls(true);
    }
  }

  cancel(): void {
    this.clearForm();
    this.cancelEmitter.emit();
  }
}
