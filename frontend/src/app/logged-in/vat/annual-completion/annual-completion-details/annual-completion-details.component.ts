import {Component, Input, OnInit} from '@angular/core';
import { formatMoney } from 'src/app/utils';
import {VatAnnualCompletion} from '../annual-completion.repository';

@Component({
  selector: 'app-vat-annual-completion-details',
  templateUrl: './annual-completion-details.component.html',
})
export class AnnualCompletionDetailsComponent implements OnInit {
  @Input() details: VatAnnualCompletion;
  submittedChangedToTrue = false;

  ngOnInit(): void {
  }

  formatMoney(value: number): string {
    if (!value) {
      return '€0.00';
    }
    return formatMoney({amount: value, currency: 'EUR'});
  }
}
