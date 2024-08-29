import { Address } from './address.interface';
import { InvoiceFilter } from './invoice-state.interface';
import { Item } from './item.interface';

export interface Invoice {
  id: string;
  createdAt: string;
  paymentDue: string;
  description: string;
  paymentTerms: number;
  clientName: string;
  clientEmail: string;
  status: InvoiceFilter;
  senderAddress: Address;
  clientAddress: Address;
  items: Item[];
  total: number;
}
