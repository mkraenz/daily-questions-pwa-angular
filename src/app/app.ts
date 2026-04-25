import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, NgClass],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  drawerOpen = signal(false);

  protected readonly navItems = [
    { label: 'Dailies', path: '/dailies' },
    { label: 'History', path: '/history' },
    { label: 'Customize Questions', path: '/customize' },
    { label: 'Settings', path: '/settings' },
    { label: 'About', path: '/about' }
  ] as const;

  toggleDrawer() {
    this.drawerOpen.update(v => !v);
  }

  closeDrawer() {
    this.drawerOpen.set(false);
  }
}
