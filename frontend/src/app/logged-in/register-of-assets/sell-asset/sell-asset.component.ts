import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {clearForm} from '../../../utils';

@Component({
  selector: 'app-sell-asset',
  templateUrl: './sell-asset.component.html',
})
export class SellAssetComponent {
  sellForm!: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  saving: false;

  constructor(private fb: FormBuilder) {
    this.sellForm = this.fb.group({
      sellDate: [undefined, [Validators.required]],
      grossAmount: ['0,00', [Validators.required]],
    });
  }

  submitForm($event: any): any {
    $event.preventDefault();
    Object.keys(this.sellForm.controls).forEach(key => {
      this.sellForm.controls[key].markAsDirty();
      this.sellForm.controls[key].updateValueAndValidity();
    });
    if (!this.sellForm.valid) {
      return;
    }
    this.clearForm();
  }

  clearForm(): void {
    clearForm(this.sellForm);
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
