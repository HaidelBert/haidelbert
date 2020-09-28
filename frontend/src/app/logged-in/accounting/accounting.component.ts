import {Component, OnInit, ViewChild} from '@angular/core';
import {RecordCategoryRepository} from './record-category.repository';
import {AccountingTableComponent} from './accounting-table/accounting-table.component';

@Component({
  selector: 'app-accounting',
  templateUrl: './accounting.component.html',
  styleUrls: ['./accounting.component.less']
})
export class AccountingComponent implements OnInit {
  @ViewChild(AccountingTableComponent) recordTable: AccountingTableComponent;
  newOpen = false;

  constructor(private recordCategoryRepository: RecordCategoryRepository) { }

  ngOnInit(): void {
    this.recordCategoryRepository.find();
  }

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
