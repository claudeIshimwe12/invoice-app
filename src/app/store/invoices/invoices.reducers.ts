import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from './../invoices/invoices.actions';
import { AppState } from '../../models/app-state.interface';

export const initialState: AppState = {
  invoices: [],
  isLoading: false,
  error: '',
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
  }))
);
