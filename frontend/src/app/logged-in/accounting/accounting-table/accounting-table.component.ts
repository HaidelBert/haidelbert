import {Component, OnInit} from '@angular/core';
import {AccountingRecord, AccountingRecordRepository, UpdateAccountingRecord} from '../accounting.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const years: number[] = [];
const upperLimitYear = new Date().getFullYear();
const lowerLimitYear = new Date().getFullYear() - 7;
for (let i = upperLimitYear; i >= lowerLimitYear; i--) {
  years.push(i);
}

@Component({
  selector: 'app-accounting-table',
  templateUrl: './accounting-table.component.html',
})
export class AccountingTableComponent implements OnInit {
  filterForm!: FormGroup;
  years = years;
  records: AccountingRecord[] = [];

  constructor(
    private accountingRecordRepository: AccountingRecordRepository,
    private fb: FormBuilder
  ) {}

  handleUpdate = async (update: Partial<UpdateAccountingRecord>): Promise<void> =>  {
    return this.accountingRecordRepository.patch(update);
  }

  async ngOnInit(): Promise<void> {
    this.filterForm = this.fb.group({
      selectedYear: [null, [Validators.required]],
      selectedQuarter: [null, [Validators.required]],
    });
    this.filterForm.controls.selectedYear.setValue(new Date().getFullYear());
    this.records = await this.accountingRecordRepository.find(
      this.filterForm.controls.selectedYear.value,
      this.filterForm.controls.selectedQuarter.value > 0 ? this.filterForm.controls.selectedQuarter.value : undefined
    );
  }

  async refresh(): Promise<void> {
    this.records = await this.accountingRecordRepository.find(
      this.filterForm.controls.selectedYear.value,
      this.filterForm.controls.selectedQuarter.value > 0 ? this.filterForm.controls.selectedQuarter.value : undefined
    );
  }
}
