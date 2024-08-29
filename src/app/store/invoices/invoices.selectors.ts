import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state.interface';
import { InvoicesState } from '../../models/invoice-state.interface';

const selectInvoicesState = createFeatureSelector<AppState, InvoicesState>(
  'invoices'
);

export const selectAllInvoices = createSelector(
  selectInvoicesState,
  (state) => state.invoices
);
export const selectFilteredInvoices = createSelector(
  selectAllInvoices,
  selectInvoicesState,
  (invoices, state) => {
    if (state.filters.length === 0 || state.filters.includes('all')) {
      return invoices;
    }

    return invoices.filter((invoice) => state.filters.includes(invoice.status));
  }
);
export const selectInvoicesLoading = createSelector(
  selectInvoicesState,
  (state) => state.loading
);
export const selectInvoicesError = createSelector(
  selectInvoicesState,
  (state) => state.error
);
