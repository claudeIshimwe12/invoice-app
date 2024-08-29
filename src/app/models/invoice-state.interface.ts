import { Invoice } from './invoice.interface';

export interface InvoicesState {
  invoices: Invoice[];
  filters: InvoiceFilter[];
  loading: boolean;
  error: string | null;
}

export type InvoiceFilter = 'all' | 'paid' | 'pending' | 'draft';
