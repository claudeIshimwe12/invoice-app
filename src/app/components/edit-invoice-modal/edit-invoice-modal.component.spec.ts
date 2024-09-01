import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInvoiceModalComponent } from './edit-invoice-modal.component';

describe('EditInvoiceModalComponent', () => {
  let component: EditInvoiceModalComponent;
  let fixture: ComponentFixture<EditInvoiceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditInvoiceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditInvoiceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
