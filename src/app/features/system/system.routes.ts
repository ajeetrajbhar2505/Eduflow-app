import { Routes } from '@angular/router';
export const SYSTEM_ROUTES: Routes = [
  { path: '', redirectTo: 'privacy', pathMatch: 'full' },
  {
    path: 'privacy',
    loadComponent: () => import('../pages/privacy-policy.component').then((m) => m.PrivacyPolicyComponent),
  },
  {
    path: 'terms',
    loadComponent: () => import('../pages/terms-of-service.component').then((m) => m.TermsOfServiceComponent),
  },
  {
    path: 'technical',
    loadComponent: () =>
      import('../pages/technical-issue-screen.component').then((m) => m.TechnicalIssueScreenComponent),
  },
  {
    path: 'reconnect',
    loadComponent: () =>
      import('../pages/re-connect-connection-screen.component').then((m) => m.ReConnectConnectionScreenComponent),
  },
  {
    path: 'loaders',
    loadComponent: () => import('../pages/app-snack-alerts-ui.component').then((m) => m.AppSnackAlertsUiComponent),
  },
];
