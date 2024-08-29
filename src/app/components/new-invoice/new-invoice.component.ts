import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';
import { Invoice } from '../../models/invoice.interface';

@Component({
  selector: 'new-invoice',
  templateUrl: './new-invoice.component.html',
  styleUrls: ['./new-invoice.component.css'],
})
export class NewInvoiceComponent {
  @Output() toggleModal = new EventEmitter<boolean>();
  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.invoiceForm = this.createInvoiceForm();
    this.addItem();
  }

  private createInvoiceForm(): FormGroup {
    return this.fb.group({
      billFrom: this.createAddressGroup(),
      billTo: this.createClientGroup(),
      invoiceDate: [''],
      paymentTerms: [''],
      projectDescription: ['', Validators.required],
      items: this.fb.array([]),
    });
  }

  private createAddressGroup(): FormGroup {
    return this.fb.group({
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  private createClientGroup(): FormGroup {
    return this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      streetAddress: ['', Validators.required],
      city: ['', Validators.required],
      postCode: ['', Validators.required],
      country: ['', Validators.required],
    });
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.createItemGroup();
    this.items.push(itemGroup);
  }

  private createItemGroup(): FormGroup {
    const itemGroup = this.fb.group({
      name: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }],
    });

    itemGroup.valueChanges.subscribe((value) => {
      const total = (value.quantity ?? 0) * (value.price ?? 0);
      itemGroup.get('total')?.setValue(total, { emitEvent: false });
    });

    return itemGroup;
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      this.markFormGroupTouched(this.invoiceForm);
      return;
    }

    const invoice = this.buildInvoice('pending');
    this.store.dispatch(InvoiceActions.addNewInvoice({ value: invoice }));
    this.toggleModal.emit();
  }

  onSaveAsDraft(): void {
    const invoice = this.buildInvoice('draft');
    this.store.dispatch(InvoiceActions.addNewInvoice({ value: invoice }));
    this.discard();
  }

  private buildInvoice(status: 'pending' | 'draft'): Invoice {
    const formValue = this.invoiceForm.value;

    return {
      id: this.generateRandomId(),
      createdAt: this.getCurrentDate(),
      paymentDue: formValue.invoiceDate,
      description: formValue.projectDescription,
      paymentTerms: formValue.paymentTerms[0],
      clientName: formValue.billTo.clientName,
      clientEmail: formValue.billTo.clientEmail,
      status,
      senderAddress: formValue.billFrom,
      clientAddress: formValue.billTo,
      items: formValue.items,
      total: this.calculateTotal(),
    };
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  private calculateTotal(): number {
    return this.items.controls.reduce((sum, control) => {
      const item = control.value;
      return sum + item.quantity * item.price;
    }, 0);
  }

  private getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private generateRandomId(): string {
    const letters = String.fromCharCode(
      Math.floor(Math.random() * 26) + 65,
      Math.floor(Math.random() * 26) + 65
    );
    const digits = Math.floor(1000 + Math.random() * 9000).toString();
    return letters + digits;
  }

  discard(): void {
    this.toggleModal.emit();
  }
}
