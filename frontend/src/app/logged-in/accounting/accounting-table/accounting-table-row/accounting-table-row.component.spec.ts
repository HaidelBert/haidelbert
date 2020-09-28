import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingTableRowComponent } from './accounting-table-row.component';

describe('AccountingTableRowComponent', () => {
  let component: AccountingTableRowComponent;
  let fixture: ComponentFixture<AccountingTableRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingTableRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingTableRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
