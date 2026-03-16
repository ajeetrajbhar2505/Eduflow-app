import { Routes } from '@angular/router';
import { OnboardingLayoutComponent } from './components/onboarding-layout.component';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingLayoutComponent,
    children: [
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
      {
        path: 'splash',
        loadComponent: () =>
          import('../pages/app-loader-screen.component').then((m) => m.AppLoaderScreenComponent),
      },
      {
        path: 'hero',
        loadComponent: () =>
          import('../pages/testimonial-slider-landing-page.component').then(
            (m) => m.TestimonialSliderLandingPageComponent,
          ),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('../pages/modern-login-screen-with-socials.component').then(
            (m) => m.ModernLoginScreenWithSocialsComponent,
          ),
      },
      {
        path: 'otp',
        loadComponent: () =>
          import('../pages/otp-verification-screen.component').then((m) => m.OtpVerificationScreenComponent),
      },
      {
        path: 'social-loading',
        loadComponent: () =>
          import('../pages/social-login-loading-state-1.component').then(
            (m) => m.SocialLoginLoadingState1Component,
          ),
      },
      {
        path: 'biometric',
        loadComponent: () =>
          import('./components/biometric.component').then((m) => m.BiometricComponent), // no Stitch asset
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('../pages/reset-password-screen.component').then((m) => m.ResetPasswordScreenComponent),
      },
    ],
  },
];
