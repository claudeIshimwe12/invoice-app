import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceService } from '../../services/invoice.service';
import * as InvoiceActions from './invoices.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
@Injectable()
export class InvoicesEffects {
  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(() =>
        this.invoiceService.getInvoices().pipe(
          tap((invoices) => {
            console.log('invoices after fetch', invoices);
            const invoicesFromLocalStorage: string =
              localStorage.getItem('invoices') ?? '';

            if (!invoicesFromLocalStorage)
              localStorage.setItem('invoices', JSON.stringify(invoices));
          }),
          map((invoices) => InvoiceActions.loadInvoicesSuccess({ invoices })),
          catchError((error) =>
            of(InvoiceActions.loadInvoicesFailure({ error: error.message }))
          )
        )
      )
    )
  );
  addInvoice$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(InvoiceActions.addNewInvoice),
        tap((action) => {
          console.log('invoices', action.value);
          localStorage.setItem('new', JSON.stringify('NEw invoie was addded'));
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}
