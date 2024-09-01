import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './models/app-state.interface';
import * as InvoiceActions from './store/invoices/invoices.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'invoice-app';

  switchedToDarkMode = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private store: Store<AppState>
  ) {
    this.store.dispatch(InvoiceActions.loadInvoices());
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Initialize theme based on localStorage
      const darkMode = localStorage.getItem('darkMode');
      this.switchedToDarkMode = darkMode === 'true';
      this.applyTheme();
    }
  }

  switchThemes = () => {
    if (isPlatformBrowser(this.platformId)) {
      this.switchedToDarkMode = !this.switchedToDarkMode;
      this.applyTheme();
      localStorage.setItem('darkMode', this.switchedToDarkMode.toString());
    }
  };

  applyTheme(): void {
    const body = document.querySelector('body');
    if (this.switchedToDarkMode) {
      body?.classList.add('dark');
    } else {
      body?.classList.remove('dark');
    }
  }
}
