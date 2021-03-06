import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {
  AccountingRecord,
  AccountingRecordRepository,
  Category,
  categoryTranslations,
  UpdateAccountingRecord
} from '../accounting.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {calculateNetAmount, formatMoney, getBase64, isValidNumber, numberRegEx} from '../../../utils';
import currency from 'currency.js';
import {NzAutocompleteOptionComponent, NzUploadFile} from 'ng-zorro-antd';
import moment from 'moment';
import {Observable, Observer} from 'rxjs';
import Dinero from 'dinero.js';

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
  categories = Object.keys(Category).map(key => {
    return {
      key,
      label: categoryTranslations[key]
    };
  });
  receipt: File[] = [];

  constructor(
    private fb: FormBuilder,
    private accountingRecordRepository: AccountingRecordRepository,
  ) {
    this.newForm = this.fb.group({
      bookingDate: ['', [Validators.required]],
      description: ['', [Validators.required]],
      receiptType: [undefined, [Validators.required]],
      reverseCharge: [false, [Validators.required]],
      grossAmount: [undefined, [Validators.required, Validators.pattern(numberRegEx)]],
      netAmount: [undefined, [Validators.required, Validators.pattern(numberRegEx)]],
      taxRate: [undefined, [Validators.required, Validators.pattern(numberRegEx)]],
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

  calculateNetAmount(): number {
    return calculateNetAmount(
        currency(this.newForm.controls.grossAmount.value).intValue,
        parseInt(this.newForm.controls.taxRate.value, 10)
    );
  }

  descriptionSelected($event: NzAutocompleteOptionComponent): void {
    const template: AccountingRecord = $event.nzValue;
    this.newForm.controls.description.setValue(template.name);
    this.newForm.controls.receiptType.setValue(template.receiptType);
    this.newForm.controls.reverseCharge.setValue(template.reverseCharge);
    this.newForm.controls.taxRate.setValue(template.taxRate);
    this.newForm.controls.category.setValue(template.category);
  }

  clearForm(): void {
    this.newForm.reset();
    Object.keys(this.newForm.controls).forEach(key => {
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

  private async mapFromForm(): Promise<UpdateAccountingRecord> {
    return {
      bookingDate: moment(this.newForm.controls.bookingDate.value).unix(),
      name: this.newForm.controls.description.value,
      receiptType: this.newForm.controls.receiptType.value,
      reverseCharge: this.newForm.controls.reverseCharge.value,
      grossAmount: currency(this.newForm.controls.grossAmount.value).intValue,
      taxRate: parseInt(this.newForm.controls.taxRate.value, 10),
      netAmount: currency(this.newForm.controls.netAmount.value).intValue,
      category: this.newForm.controls.category.value,
      receipt: await getBase64(this.receipt[0])
    };
  }

  async submitForm(e: any): Promise<void> {
    e.preventDefault();
    Object.keys(this.newForm.controls).forEach(key => {
      this.newForm.controls[key].markAsDirty();
      this.newForm.controls[key].updateValueAndValidity();
    });
    if (!this.newForm.valid || this.receipt.length === 0) {
      console.error('Form is invalid');
      return;
    }
    this.saving = true;
    this.enableControls(false);
    try {
      await this.accountingRecordRepository.post(await this.mapFromForm());
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

  beforeUpload = (file: File): boolean => {
    this.receipt = [file];
    return false;
  }

  handleGrossAmountChanged(): void {
    this.reCalculateNetAmount();
  }

  handleTaxRateChanged(): void {
    this.reCalculateNetAmount();
  }

  private reCalculateNetAmount(): void {
    if (!isValidNumber(this.newForm.controls.grossAmount.value) || !isValidNumber(this.newForm.controls.taxRate.value)){
      return;
    }
    const netAmount = this.calculateNetAmount();
    const netAmountFormatted = Dinero({ amount: netAmount, currency: 'EUR' }).toFormat('0.00');
    this.newForm.controls.netAmount.setValue(netAmountFormatted);
  }

  handleReverseChargeChanged(): void {
    if (this.newForm.controls.reverseCharge.value) {
      this.newForm.controls.taxRate.setValue(0);
    }
  }
}
