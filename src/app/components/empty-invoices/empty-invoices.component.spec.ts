import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyInvoicesComponent } from './empty-invoices.component';

describe('EmptyInvoicesComponent', () => {
  let component: EmptyInvoicesComponent;
  let fixture: ComponentFixture<EmptyInvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyInvoicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyInvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
