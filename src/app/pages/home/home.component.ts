import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  isFilterOn: boolean = false;
  toggleFilter() {
    this.isFilterOn = !this.isFilterOn;
  }
}
