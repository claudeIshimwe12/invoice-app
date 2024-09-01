import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { FilterComponent } from './components/filter/filter.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoicesEffects } from './store/invoices/invoices.effects';
import { invoiceReducers } from './store/invoices/invoices.reducers';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { FormsModule } from '@angular/forms';
import { NewInvoiceComponent } from './components/new-invoice/new-invoice.component';
import { EmptyInvoicesComponent } from './components/empty-invoices/empty-invoices.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SingleInvoiceComponent } from './pages/single-invoice/single-invoice.component';
import { EditInvoiceModalComponent } from './components/edit-invoice-modal/edit-invoice-modal.component';
import { UIReducers } from './store/ui/ui.reducers';
@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    NotFoundComponent,
    FilterComponent,
    InvoiceComponent,
    NewInvoiceComponent,
    EmptyInvoicesComponent,
    SingleInvoiceComponent,
    EditInvoiceModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({ invoices: invoiceReducers, ui: UIReducers }),
    EffectsModule.forRoot([InvoicesEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true, // If set to true, the connection is established within the Angular zone
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
