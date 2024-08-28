import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { InvoiceService } from '../../services/invoice.service';
import * as InvoiceActions from './invoices.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
@Injectable()
export class InvoicesEffects {
  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoiceActions.loadInvoices),
      mergeMap(() =>
        this.invoiceService.getInvoices().pipe(
          map((invoices) => InvoiceActions.loadInvoicesSuccess({ invoices })),
          catchError((error) =>
            of(InvoiceActions.loadInvoicesFailure({ error: error.message }))
          )
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private invoiceService: InvoiceService
  ) {}
}
