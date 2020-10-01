import {Component, ViewChild} from '@angular/core';
import {AccountingTableComponent} from './accounting-table/accounting-table.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.less']
})
export class AccountingComponent {
  @ViewChild(AccountingTableComponent) recordTable: AccountingTableComponent;
  newOpen = false;

  constructor() { }

  openNew(): void {
    this.newOpen = true;
  }

  closeNew(): void {
    this.newOpen = false;
  }

  handleNewSuccess(): void {
    this.newOpen = false;
    this.recordTable.refresh();
  }
}
