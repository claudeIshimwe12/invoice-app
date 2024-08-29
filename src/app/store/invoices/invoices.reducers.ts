import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './../invoices/invoices.actions';
import { InvoicesState } from '../../models/invoice-state.interface';

export const initialState: InvoicesState = {
  invoices: [],
  filters: [],
  loading: false,
  error: null,
};
export const invoiceReducers = createReducer(
  initialState,

  on(InvoiceActions.loadInvoices, (state) => ({ ...state, isLoading: true })),

  on(InvoiceActions.loadInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    invoices,
    isLoading: false,
  })),

  on(InvoiceActions.loadInvoicesFailure, (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
  })),
  on(InvoiceActions.addNewInvoice, (state, actions) => ({
    ...state,
    invoices: [...state.invoices, actions.value],
  })),
  on(InvoiceActions.setInvoiceFilters, (state, { filters }) => ({
    ...state,
    filters,
  }))
);
