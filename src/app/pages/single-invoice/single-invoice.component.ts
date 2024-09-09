import { Component, OnInit } from '@angular/core';
import { AppState } from '../../models/app-state.interface';
import { select, Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { Invoice } from '../../models/invoice.interface';
import { selectFilteredInvoices } from '../../store/invoices/invoices.selectors';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Item } from '../../models/item.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';
import * as UIActions from '../../store/ui/ui.actions';

import {
  selectConfirmDeleteModal,
  selectModalVisibility,
} from '../../store/ui/ui.selectors';
import * as UiActions from '../../store/ui/ui.actions';

@Component({
  selector: 'app-single-invoice',
  templateUrl: './single-invoice.component.html',
  styleUrl: './single-invoice.component.css',
})
export class SingleInvoiceComponent implements OnInit {
  toggleNewInvoice: boolean = false;
  invoice$!: Observable<Invoice>;
  invoiceId!: string | null;
  toggleConfirm$!: Observable<boolean>;
  toggleNewInvoice$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: ActivatedRoute,
    private router2: Router
  ) {
    this.toggleNewInvoice$ = this.store.pipe(select(selectModalVisibility));
  }
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
    this.toggleConfirm$ = this.store.pipe(select(selectConfirmDeleteModal));
  }
  calculateTotal(items: Item[]): number {
    return items.reduce((sum, item) => sum + item.total, 0);
  }
  onDeleteInvoice(id: string): void {
    this.store.dispatch(InvoiceActions.deleteInvoice({ id }));
    this.store.dispatch(UiActions.toggleConfirmDeleteModal());

    this.router2.navigate(['../..'], { relativeTo: this.router });
  }
  toggle(): void {
    this.store.dispatch(UIActions.toggleNewInvoiceModal());

    this.toggleNewInvoice = !this.toggleNewInvoice;
  }
  markAsPaid(id: string): void {
    this.store.dispatch(InvoiceActions.markInvoiceAsPaid({ id }));
  }
  toggleConfirmDelete() {
    this.store.dispatch(UiActions.toggleConfirmDeleteModal());
  }
}
