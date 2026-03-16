import { Routes } from '@angular/router';
export const ANALYTICS_ROUTES: Routes = [
  { path: '', redirectTo: 'results', pathMatch: 'full' },
  {
    path: 'results',
    loadComponent: () =>
      import('../pages/review-success-celebration-screen.component').then(
        (m) => m.ReviewSuccessCelebrationScreenComponent,
      ),
  },
  {
    path: 'grid',
    loadComponent: () => import('../pages/exam-history-2.component').then((m) => m.ExamHistory2Component),
  },
  {
    path: 'detail',
    loadComponent: () => import('../pages/exam-history-3.component').then((m) => m.ExamHistory3Component),
  },
  {
    path: 'history',
    loadComponent: () => import('../pages/exam-history-1.component').then((m) => m.ExamHistory1Component),
  },
  {
    path: 'marksheet',
    loadComponent: () =>
      import('../pages/exam-marksheet-pdf-ui.component').then((m) => m.ExamMarksheetPdfUiComponent),
  },
  {
    path: 'submit-review',
    loadComponent: () =>
      import('../pages/submit-exam-review-form.component').then((m) => m.SubmitExamReviewFormComponent),
  },
];
