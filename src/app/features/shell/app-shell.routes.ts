import { Routes } from '@angular/router';
import { ShellLayoutComponent } from './shell-layout.component';

export const APP_SHELL_ROUTES: Routes = [
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'student-hub',
        pathMatch: 'full',
      },
      {
        path: 'student-hub',
        loadChildren: () => import('../student-hub/student-hub.routes').then((m) => m.STUDENT_HUB_ROUTES),
      },
      {
        path: 'exam',
        loadChildren: () => import('../exam/exam.routes').then((m) => m.EXAM_ROUTES),
      },
      {
        path: 'analytics',
        loadChildren: () => import('../analytics/analytics.routes').then((m) => m.ANALYTICS_ROUTES),
      },
      {
        path: 'challenges',
        loadChildren: () => import('../challenges/challenges.routes').then((m) => m.CHALLENGE_ROUTES),
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.routes').then((m) => m.ADMIN_ROUTES),
      },
      {
        path: 'system',
        loadChildren: () => import('../system/system.routes').then((m) => m.SYSTEM_ROUTES),
      },
      {
        path: '**',
        redirectTo: 'student-hub',
      },
    ],
  },
];
