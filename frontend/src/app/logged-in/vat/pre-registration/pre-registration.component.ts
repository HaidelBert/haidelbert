import {Component, OnInit} from '@angular/core';
import {
  PreRegistrationRepository,
  VatPreRegistration,
  VatPreRegistrationInterval,
} from './pre-registration.repository';
import {Subject} from 'rxjs';
import {FormBuilder} from '@angular/forms';
import { formatMoney } from 'src/app/utils';

@Component({
  selector: 'app-vat-pre-registration',
  templateUrl: './pre-registration.component.html',
})
export class PreRegistrationComponent implements OnInit {
  selectedYear: number;
  selectableYears: number[] = [];
  selectableYearsLoading = true;
  preRegistrations: VatPreRegistration[];
  selectedYear$ = new Subject<number>();
  newOpen = false;
  details: VatPreRegistration = undefined;
  detailsOpen = false;

  constructor(private preRegistrationRepository: PreRegistrationRepository, private fb: FormBuilder) {}

  async ngOnInit(): Promise<void> {
    this.selectedYear$.subscribe(value => {
      this.preRegistrationRepository.findByYear(value).then(preRegistrations => {
        this.preRegistrations = preRegistrations;
      });
    });
    try {
      this.selectableYears = await this.preRegistrationRepository.findYears();
      this.selectedYear = this.selectableYears[0];
      this.selectedYear$.next(this.selectedYear);
    } finally {
      this.selectableYearsLoading = false;
    }
  }

  async refresh(): Promise<void> {
    this.preRegistrations = await this.preRegistrationRepository.findByYear(this.selectedYear);
  }

  formatInterval(data: VatPreRegistration): string {
    if (!data) {
      return '';
    }
    if (data.interval === VatPreRegistrationInterval.QUARTER) {
      return 'Quartal ' + data.quarter;
    }
    const date = new Date(data.year, data.month - 1, 1);  // 2009-11-10
    return date.toLocaleString('default', { month: 'long' });
  }

  closeNew(): void {
    this.newOpen = false;
  }

  formatMonth(m: number): string {
    const date = new Date(2020, m - 1, 1);
    return date.toLocaleString('default', { month: 'long' });
  }

  async showDetails(data: VatPreRegistration): Promise<void>{
    this.details = undefined;
    this.detailsOpen = true;
    this.details = data;
  }

  closeDetails(): void {
    this.detailsOpen = false;
    this.details = undefined;
  }

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }

  async markDone(data: VatPreRegistration): Promise<void> {
    await this.preRegistrationRepository.change(data.id, {
      taxAuthoritySubmitted: true
    });
    await this.refresh();
  }

  async handleNewResult(result: boolean): Promise<void> {
    this.newOpen = false;
    if (result) {
      await this.refresh();
    }
  }
}
