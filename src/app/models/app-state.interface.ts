import { Invoice } from './invoice.interface';

export interface AppState {
  isLoading: boolean;
  invoices: Invoice[];
  error: string;
}
