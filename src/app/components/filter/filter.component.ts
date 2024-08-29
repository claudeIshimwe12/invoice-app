import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../models/app-state.interface';
import * as InvoiceActions from '../../store/invoices/invoices.actions';
import { InvoiceFilter } from '../../models/invoice-state.interface';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  isFilterOn: boolean = false;
  @Output() onAddNew: EventEmitter<boolean> = new EventEmitter();
  activeFilters: InvoiceFilter[] = [];
  constructor(private store: Store<AppState>) {}
  toggleFilter() {
    this.isFilterOn = !this.isFilterOn;
  }

  addNew() {
    this.onAddNew.emit();
  }

  onFilterToggle(filter: InvoiceFilter): void {
    const index = this.activeFilters.indexOf(filter);
    let newFilters;

    if (this.activeFilters.includes(filter)) {
      newFilters = this.activeFilters.filter((f) => f !== filter);
    } else {
      newFilters = [...this.activeFilters, filter];
    }

    this.store.dispatch(
      InvoiceActions.setInvoiceFilters({ filters: newFilters })
    );

    this.activeFilters = newFilters;
  }
}
