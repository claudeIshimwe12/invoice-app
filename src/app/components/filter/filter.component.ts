import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  isFilterOn: boolean = false;
  toggleFilter() {
    this.isFilterOn = !this.isFilterOn;
  }
}
