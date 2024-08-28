import { HttpClient } from '@angular/common/http';
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
}
