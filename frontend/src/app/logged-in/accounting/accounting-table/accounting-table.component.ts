import {Component, OnInit} from '@angular/core';
import {AccountingRecord, AccountingRecordRepository, UpdateAccountingRecord} from '../accounting.repository';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import moment from 'moment';

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
  ) {
    this.filterForm = this.fb.group({
      selectedYear: [new Date().getFullYear(), [Validators.required]],
      selectedQuarter: [moment().quarter(), [Validators.required]],
    });
  }

  handleUpdate = async (id: number, update: Partial<UpdateAccountingRecord>): Promise<void> =>  {
    await this.accountingRecordRepository.patch(id, update);
    this.refresh();
  }
  handleDelete = async (id: number): Promise<void> =>  {
    await this.accountingRecordRepository.delete(id);
    this.refresh();
  }

  async ngOnInit(): Promise<void> {
    this.records = await this.accountingRecordRepository.find(
      this.filterForm.controls.selectedYear.value,
      this.filterForm.controls.selectedQuarter.value
    );
  }

  async refresh(): Promise<void> {
    this.records = await this.accountingRecordRepository.find(
      this.filterForm.controls.selectedYear.value,
      this.filterForm.controls.selectedQuarter.value > 0 ? this.filterForm.controls.selectedQuarter.value : undefined
    );
  }

  async startDownload(id: number): Promise<void> {
    try {
      const response = await this.accountingRecordRepository.downloadReceipt(id);
      const headers = response.headers;
      const blob = new Blob([response.body], { type: headers.get('content-type') });
      const windowUrl = (window.URL || window.webkitURL);
      const downloadUrl = windowUrl.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      const fileNamePattern = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      anchor.download = fileNamePattern.exec(headers.get('content-disposition'))[1];
      document.body.appendChild(anchor);
      anchor.click();
    }catch (e) {
      console.error(e);
    }
  }
}
