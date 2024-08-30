import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingInvoiceComponent } from './sing-invoice.component';

describe('SingInvoiceComponent', () => {
  let component: SingInvoiceComponent;
  let fixture: ComponentFixture<SingInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
