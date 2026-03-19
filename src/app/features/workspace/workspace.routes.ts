import { Routes } from '@angular/router';
import { WorkspaceShellComponent } from './workspace-shell.component';
import { WorkspacePlaceholderComponent } from './workspace-placeholder.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamsComponent } from './exams/exams.component';
import { ExamInstructionsComponent } from './exam-instructions/exam-instructions.component';
import { RankingsComponent } from './rankings/rankings.component';
import { HistoryComponent } from './history/history.component';
import { LiveExaminationComponent } from './live-examination/live-examination.component';
import { QuestionOverviewComponent } from './live-examination/question-overview/question-overview.component';
import { MalpracticeAlertComponent } from './live-examination/malpractice-alert/malpractice-alert.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { ReviewQuestionsComponent } from './review-questions/review-questions.component';
import { ReviewSelectedQuestionsComponent } from './review-selected-questions/review-selected-questions.component';

export const WORKSPACE_ROUTES: Routes = [
  {
    path: '',
    component: WorkspaceShellComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: 'SCREEN_227 · Student Dashboard' } },
      { path: 'profile', component: ProfileComponent, data: { title: 'SCREEN_227 · Student Dashboard' } },
      { path: 'exams', component: ExamsComponent, data: { title: 'SCREEN_227 · Student Dashboard' } },
      { path: 'exam-instructions', component: ExamInstructionsComponent, data: { title: 'SCREEN_227 · Student Dashboard' } },
      { path: 'rankings', component: RankingsComponent, data: { title: 'SCREEN_226 · Exam Catalog' } },
      { path: 'history', component: HistoryComponent, data: { title: 'SCREEN_226 · Exam Catalog' } },
      { path: 'live', component: LiveExaminationComponent, data: { title: 'SCREEN_116 · Partner Profile' } },
      { path: 'question-overview', component: QuestionOverviewComponent, data: { title: 'SCREEN_116 · Partner Profile' } },
      { path: 'malpractice-alert', component: MalpracticeAlertComponent, data: { title: 'SCREEN_73 · Empty Catalog' } },
      { path: 'exam-result', component: ExamResultComponent, data: { title: 'SCREEN_116 · Partner Profile' } },
      { path: 'review-questions', component: ReviewQuestionsComponent, data: { title: 'SCREEN_80 · Exam Instructions' } },
      { path: 'review-selected-questions', component: ReviewSelectedQuestionsComponent, data: { title: 'SCREEN_80 · Exam Instructions' } },
      { path: 'ai-chat', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_55 · AI Chat Assistant' } },
      { path: 'exam-live', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_43 · Live Examination' } },
      { path: 'exam-grid', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_190 · Question Navigation' } },
      { path: 'malpractice', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_40 · Malpractice Alert' } },
      { path: 'proctor', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_39 · Video Proctor' } },
      { path: 'results', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_215 · Results Summary' } },
      { path: 'review-grid', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_70 · Review Grid' } },
      { path: 'review-detail', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_114 · Detailed Review' } },
      { path: 'history', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_229 · Exam History' } },
      { path: 'marksheet', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_230 · Marksheet PDF' } },
      { path: 'feedback', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_45 · Submit Review' } },
      { path: 'challenges', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_209 · Challenge Hub' } },
      { path: 'scoreboard', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_177 · Live Scoreboard' } },
      { path: 'victory', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_108 · Victory' } },
      { path: 'leaderboard', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_76 · Leaderboard' } },
      { path: 'challenge-history', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_185 · Match History' } },
      { path: 'challenge-create', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_153 · Create Challenge' } },
      { path: 'admin/ai-generator', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_144 · AI Exam Generator' } },
      { path: 'admin/manage', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_147 · Manage Quiz' } },
      { path: 'admin/edit-question', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_195 · Edit Question' } },
      { path: 'admin/edit-quiz', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_44 · Edit Quiz Details' } },
      { path: 'system/privacy', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_214 · Privacy Policy' } },
      { path: 'system/terms', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_6 · Terms of Service' } },
      { path: 'system/reconnect', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_83 · Re-connect' } },
      { path: 'system/technical', component: WorkspacePlaceholderComponent, data: { title: 'SCREEN_221 · Technical Issue' } },
      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
