import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {clearForm} from '../../../utils';
import {CreateAsset, AssetsRepository} from '../assets.repository';
import currency from 'currency.js';

@Component({
  selector: 'app-new-asset',
  templateUrl: './new-asset.component.html',
})
export class NewAssetComponent {
  newForm!: FormGroup;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
  saving: false;

  constructor(private fb: FormBuilder, private registerOfAssetRepository: AssetsRepository) {
    this.newForm = this.fb.group({
      name: ['', [Validators.required]],
      purchaseDate: [undefined, [Validators.required]],
      grossAmount: ['0,00', [Validators.required]],
      netAmount: ['0,00', [Validators.required]],
      depreciationDuration: [3, [Validators.required]],
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
    await this.registerOfAssetRepository.add(this.mapFromForm());
    this.clearForm();
  }

  mapFromForm(): CreateAsset {
    return {
      name: this.newForm.controls.name.value.toString(),
      depreciationDuration: parseInt(this.newForm.controls.depreciationDuration.value, 10),
      grossAmount: currency(this.newForm.controls.grossAmount.value).intValue,
      netAmount: currency(this.newForm.controls.netAmount.value).intValue,
      purchaseDate: this.newForm.controls.purchaseDate.value
    };
  }

  clearForm(): void {
    clearForm(this.newForm);
  }

  handleCancel(): void {
    this.cancel.emit();
  }
}
