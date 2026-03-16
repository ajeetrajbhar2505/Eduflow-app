import { Routes } from '@angular/router';
export const CHALLENGE_ROUTES: Routes = [
  { path: '', redirectTo: 'hub', pathMatch: 'full' },
  {
    path: 'hub',
    loadComponent: () =>
      import('../pages/competitive-challenge-hub-1.component').then(
        (m) => m.CompetitiveChallengeHub1Component,
      ),
  },
  {
    path: 'live',
    loadComponent: () =>
      import('../pages/live-challenge-scoreboard-1.component').then(
        (m) => m.LiveChallengeScoreboard1Component,
      ),
  },
  {
    path: 'victory',
    loadComponent: () =>
      import('../pages/review-success-celebration-screen.component').then(
        (m) => m.ReviewSuccessCelebrationScreenComponent,
      ),
  },
  {
    path: 'history',
    loadComponent: () =>
      import('../pages/competitive-challenge-hub-2.component').then((m) => m.CompetitiveChallengeHub2Component),
  },
  {
    path: 'leaderboard',
    loadComponent: () => import('../pages/leaderboards.component').then((m) => m.LeaderboardsComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('../pages/open-class-challenge.component').then((m) => m.OpenClassChallengeComponent),
  },
];
