import { InvoicesState } from './invoice-state.interface';
import { Invoice } from './invoice.interface';
import { UIState } from './ui-state.interface';

export interface AppState {
  invoices: InvoicesState;
  ui: UIState;
}
