import { Component, OnInit } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectAllInvoices,
  selectFilteredInvoices,
} from '../../store/invoices/invoices.selectors';
import { AppState } from '../../models/app-state.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  invoices$!: Observable<Invoice[]>;
  loader$!: Observable<boolean>;
  // invoices$: Observable<Invoice[]> = of([]);
  toggleNewInvoice: boolean = false;
  constructor(private store: Store<AppState>, private router: Router) {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }

  ngOnInit(): void {
    this.invoices$ = this.store.pipe(select(selectFilteredInvoices));
    // this.loader$ = this.store.pipe(select(selectIsLoading));
  }

  toggle() {
    this.toggleNewInvoice = !this.toggleNewInvoice;
  }

  onInvoiceClick(id: string) {
    this.router.navigate(['/invoice', id]);
  }
}
