import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../models/invoice.interface';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  url: string = 'assets/data.json';

  constructor(private http: HttpClient) {}
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(this.url);
  }
  addInvoice(): Observable<Invoice[]> {
    const invoice: Invoice = {
      id: 'FV2358',
      createdAt: '2021-11-06',
      paymentDue: '2021-11-12',
      description: 'Logo Re-design',
      paymentTerms: 7,
      clientName: 'Anita Wainwright',
      clientEmail: '',
      status: 'draft',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'Rwanda',
      },
      clientAddress: {
        street: '',
        city: '',
        postCode: '',
        country: '',
      },
      items: [
        {
          name: 'Logo Re-design',
          quantity: 1,
          price: 3102.04,
          total: 3102.04,
        },
      ],
      total: 15454,
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Invoice[]>(this.url, invoice, { headers });
  }
}
