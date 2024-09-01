import { Component, OnInit } from '@angular/core';
import { AppState } from '../../models/app-state.interface';
import { select, Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { Invoice } from '../../models/invoice.interface';
import { selectFilteredInvoices } from '../../store/invoices/invoices.selectors';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Item } from '../../models/item.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrl: './single-invoice.component.css',
})
export class SingleInvoiceComponent implements OnInit {
  toggleNewInvoice: boolean = false;
  invoice$!: Observable<Invoice>;
  invoiceId!: string | null;
  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private router2: Router
  ) {}
  onGoBack() {
    this.router2.navigate(['../..'], { relativeTo: this.router });
  }
  ngOnInit(): void {
    this.router.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.invoiceId = idParam;
    });
    this.invoice$ = this.store.pipe(
      select(selectFilteredInvoices),
      map(
        (invoices) =>
          invoices.find((invoice) => invoice.id === this.invoiceId) as Invoice
      )
    );
  }
  calculateTotal(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.total, 0);
  }
  onDeleteInvoice(id: string): void {
    this.store.dispatch(InvoiceActions.deleteInvoice({ id }));
    this.router2.navigate(['../..'], { relativeTo: this.router });
  }
  toggle(): void {
    this.toggleNewInvoice = !this.toggleNewInvoice;
  }
  markAsPaid(id: string): void {
    this.store.dispatch(InvoiceActions.markInvoiceAsPaid({ id }));
  }
}
