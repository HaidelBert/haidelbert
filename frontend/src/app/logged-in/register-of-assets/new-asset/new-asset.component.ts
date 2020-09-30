import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {clearForm} from '../../../utils';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
})
export class NewAssetComponent {
  newForm!: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  saving: false;

  constructor(private fb: FormBuilder) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      purchaseDate: [undefined, [Validators.required]],
      grossAmount: ['0,00', [Validators.required]],
      netAmount: ['0,00', [Validators.required]],
      depreciationDuration: [3, [Validators.required]],
    });
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
  }

  clearForm(): void {
    clearForm(this.newForm);
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
