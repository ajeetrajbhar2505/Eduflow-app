import { Routes } from '@angular/router';
import { OnboardingShellComponent } from './onboarding-shell.component';
import { OnboardingPlaceholderComponent } from './onboarding-placeholder.component';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingShellComponent,
    children: [
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
      { path: 'splash', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_69 · Splash' } },
      { path: 'hero', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_219 · Hero Slider' } },
      { path: 'login', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_218 · Modern Login' } },
      { path: 'otp', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_223 · OTP Verification' } },
      { path: 'social-loading', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_216 · Social Loading' } },
      { path: 'biometric', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_180 · Biometric Access' } },
      { path: 'reset-password', component: OnboardingPlaceholderComponent, data: { title: 'SCREEN_212 · Reset Password' } },
    ],
  },
];
