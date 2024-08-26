import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css',
})
export class NavigationBarComponent {
  @Input() isDarkMode: boolean = false;
  @Output() toggleDarkMode: EventEmitter<boolean> = new EventEmitter<boolean>();

  switchToDarkMode() {
    this.toggleDarkMode.emit();
  }
}
