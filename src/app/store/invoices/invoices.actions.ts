import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../models/invoice.interface';
import { InvoiceFilter } from '../../models/invoice-state.interface';

export const loadInvoices = createAction('[Invoice] Load Invoices');
export const loadInvoicesSuccess = createAction(
  '[Invoice] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);
export const loadInvoicesFailure = createAction(
  '[Invoice] Load Invoices Failure',
  props<{ error: string }>()
);
export const addNewInvoice = createAction(
  '[Invoice] Add Invoice',
  props<{ value: Invoice }>()
);

export const setInvoiceFilter = createAction(
  '[Invoices] Set Filter',
  props<{ filter: InvoiceFilter }>()
);
export const setInvoiceFilters = createAction(
  '[Invoices] Set Filters',
  props<{ filters: InvoiceFilter[] }>()
);
export const deleteInvoice = createAction(
  '[Invoices] Delete Invoice',
  props<{ id: string }>()
);

export const markInvoiceAsPaid = createAction(
  '[Invoices] Mark As Paid ',
  props<{ id: string }>()
);
