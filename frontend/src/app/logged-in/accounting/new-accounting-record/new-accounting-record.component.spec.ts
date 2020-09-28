import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAccountingRecordComponent } from './new-accounting-record.component';

describe('NewAccountingRecordComponent', () => {
  let component: NewAccountingRecordComponent;
  let fixture: ComponentFixture<NewAccountingRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAccountingRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAccountingRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
