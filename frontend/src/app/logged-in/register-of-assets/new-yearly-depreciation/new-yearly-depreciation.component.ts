import {Component, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AssetDepreciationPreview, AssetDepreciationsRepository} from '../asset-depreciations.repository';
import {formatMoney} from '../../../utils';
import {YearDepreciationRepository} from '../year-depreciation.repository';

@Component({
  selector: 'app-new-yearly-depreciation',
  templateUrl: './new-yearly-depreciation.component.html',
})
export class NewYearlyDepreciationComponent {
  @Output() done = new EventEmitter<boolean>();
  yearSelectForm!: FormGroup;
  saving = false;
  currentStep = 0;
  private previews: AssetDepreciationPreview[];

  constructor(private fb: FormBuilder, private assetDepreciationsRepository: AssetDepreciationsRepository, private yearDepreciationRepository: YearDepreciationRepository) {
    this.yearSelectForm = this.fb.group({
      year: [new Date().getFullYear() - 1, [Validators.required]],
    });
  }

  cancel(): void {
    this.done.emit(false);
    this.currentStep = 0;
  }

  submitYearSelectForm(event: any): void {
    event.preventDefault();
  }

  async next(): Promise<void> {
    this.previews = await this.assetDepreciationsRepository.preview(this.yearSelectForm.controls.year.value);
    this.currentStep++;
  }

  previous(): void {
    this.currentStep--;
  }

  async executeDepreciations(): Promise<void> {
    await this.yearDepreciationRepository.add(this.yearSelectForm.controls.year.value);
    this.done.emit(true);
  }

  formatMoney(netDepreciationAmount: number): string {
    return formatMoney({ amount: netDepreciationAmount, currency: 'EUR' });
  }
}
