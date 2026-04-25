import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dailies', pathMatch: 'full' },
  {
    path: 'dailies',
    loadComponent: () => import('./dailies/dailies').then((m) => m.DailiesComponent),
  },
  {
    path: 'history',
    loadComponent: () => import('./history/history').then((m) => m.HistoryComponent),
  },
  {
    path: 'customize',
    loadComponent: () =>
      import('./customize-questions/customize-questions').then(
        (m) => m.CustomizeQuestionsComponent,
      ),
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings').then((m) => m.SettingsComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.AboutComponent),
  },
];
