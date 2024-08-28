import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectInvoices } from '../../store/invoices/invoices.selectors';
import { AppState } from '../../models/app-state.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  // invoices$: Observable<Invoice[]> = of([]);

  constructor(private store: Store<AppState>) {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }

  ngOnInit(): void {
    this.invoices$ = this.store.pipe(select(selectInvoices));
  }
}
