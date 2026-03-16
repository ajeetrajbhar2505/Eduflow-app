import { Routes } from '@angular/router';
export const ADMIN_ROUTES: Routes = [
  { path: '', redirectTo: 'ai-generator', pathMatch: 'full' },
  {
    path: 'ai-generator',
    loadComponent: () => import('../pages/ai-exam-generator-1.component').then((m) => m.AiExamGenerator1Component),
  },
  {
    path: 'manage',
    loadComponent: () => import('../pages/ai-exam-generator-2.component').then((m) => m.AiExamGenerator2Component),
  },
  {
    path: 'edit-question',
    loadComponent: () => import('../pages/ai-exam-generator-3.component').then((m) => m.AiExamGenerator3Component),
  },
  {
    path: 'edit-quiz',
    loadComponent: () => import('../pages/ai-exam-generator-4.component').then((m) => m.AiExamGenerator4Component),
  },
];
