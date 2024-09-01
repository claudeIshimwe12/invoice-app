import { Component } from '@angular/core';
import { Invoice } from '../../models/invoice.interface';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { selectFilteredInvoices } from '../../store/invoices/invoices.selectors';
import { AppState } from '../../models/app-state.interface';
import { Router } from '@angular/router';
import { selectModalVisibility } from '../../store/ui/ui.selectors';
import * as UIActions from '../../store/ui/ui.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  invoices$!: Observable<Invoice[]>;
  loader$!: Observable<boolean>;
  toggleNewInvoice$: Observable<boolean>;
  constructor(private store: Store<AppState>, private router: Router) {
    this.invoices$ = this.store.pipe(select(selectFilteredInvoices));
    this.toggleNewInvoice$ = this.store.pipe(select(selectModalVisibility));
  }

  toggle() {
    this.store.dispatch(UIActions.toggleNewInvoiceModal());
  }

  onInvoiceClick(id: string) {
    this.router.navigate(['/invoice', id]);
  }
}
