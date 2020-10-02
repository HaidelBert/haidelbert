import {Component, Input, OnInit} from '@angular/core';
import {VatPreRegistration, VatPreRegistrationInterval} from '../pre-registration.repository';
import { formatMoney } from 'src/app/utils';

@Component({
  selector: 'app-vat-pre-registration-details',
  templateUrl: './pre-registration-details.component.html',
})
export class PreRegistrationDetailsComponent implements OnInit {
  @Input() details: VatPreRegistration;
  submittedChangedToTrue = false;

  ngOnInit(): void {
  }

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }

  formatInterval(data: VatPreRegistration): string {
    if (!data) {
      return '';
    }
    if (data.interval === VatPreRegistrationInterval.QUARTER) {
      return 'Quartal ' + data.intervalValue;
    }
    const date = new Date(data.year, data.intervalValue - 1, 1);  // 2009-11-10
    return date.toLocaleString('default', { month: 'long' });
  }
}
