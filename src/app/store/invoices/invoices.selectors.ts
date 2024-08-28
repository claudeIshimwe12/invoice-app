import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state.interface';

export const selectInvoiceState = createFeatureSelector<AppState>('appState');

export const selectInvoices = createSelector(
  selectInvoiceState,
  (state: AppState) => state.invoices
);

export const selectIsLoading = createSelector(
  selectInvoiceState,
  (state: AppState) => state.isLoading
);

export const selectError = createSelector(
  selectInvoiceState,
  (state: AppState) => state.error
);
