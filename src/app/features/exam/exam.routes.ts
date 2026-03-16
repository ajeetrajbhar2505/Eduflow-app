import { Routes } from '@angular/router';
import { QuestionGridComponent } from './views/question-grid.component';
import { MalpracticeComponent } from './views/malpractice.component';
import { ProctorVideoComponent } from './views/proctor-video.component';
export const EXAM_ROUTES: Routes = [
  { path: '', redirectTo: 'instructions', pathMatch: 'full' },
  {
    path: 'instructions',
    loadComponent: () =>
      import('../pages/exam-instructions-1.component').then((m) => m.ExamInstructions1Component),
  },
  {
    path: 'live',
    loadComponent: () => import('../pages/live-examination-1.component').then((m) => m.LiveExamination1Component),
  },
  {
    path: 'grid',
    loadComponent: () => import('../pages/live-examination-3.component').then((m) => m.LiveExamination3Component),
  },
  {
    path: 'malpractice',
    loadComponent: () =>
      import('../pages/technical-issue-screen.component').then((m) => m.TechnicalIssueScreenComponent),
  },
  {
    path: 'proctor',
    loadComponent: () => import('../pages/live-examination-2.component').then((m) => m.LiveExamination2Component),
  },
];
