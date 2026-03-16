import { Routes } from '@angular/router';
export const STUDENT_HUB_ROUTES: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('../pages/student-dashboard-1.component').then((m) => m.StudentDashboard1Component),
  },
  {
    path: 'catalog',
    loadComponent: () => import('../pages/exam-catalog-1.component').then((m) => m.ExamCatalog1Component),
  },
  {
    path: 'catalog-empty',
    loadComponent: () => import('../pages/exam-catalog-3.component').then((m) => m.ExamCatalog3Component),
  },
  {
    path: 'partner',
    loadComponent: () =>
      import('../pages/partner-institution-profile-1.component').then(
        (m) => m.PartnerInstitutionProfile1Component,
      ),
  },
  {
    path: 'ai-chat',
    loadComponent: () => import('../pages/ai-study-assistant-chat.component').then((m) => m.AiStudyAssistantChatComponent),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('../pages/profile-and-settings.component').then((m) => m.ProfileAndSettingsComponent),
  },
];
