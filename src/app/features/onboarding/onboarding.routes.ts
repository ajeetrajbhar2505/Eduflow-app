import { Routes } from '@angular/router';
import { OnboardingShellComponent } from './onboarding-shell.component';
import { LoginComponent } from './login/login.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { SocialLoginFacebookComponent } from './social-login-facebook/social-login-facebook.component';
import { SocialLoginFingureprintComponent } from './social-login-fingureprint/social-login-fingureprint.component';
import { SocialLoginGoogleComponent } from './social-login-google/social-login-google.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SplashScreenComponent } from './splash-screen.component';

export const ONBOARDING_ROUTES: Routes = [
  {
    path: '',
    component: OnboardingShellComponent,
    children: [
      { path: '', redirectTo: 'splash', pathMatch: 'full' },
      { path: 'splash', component: SplashScreenComponent },
      { path: 'login', component: LoginComponent},
      { path: 'otp', component: OtpVerificationComponent},
      { path: 'social-login-google', component: SocialLoginGoogleComponent },
      { path: 'social-login-facebook', component: SocialLoginFacebookComponent },
      { path: 'biometric', component: SocialLoginFingureprintComponent},
      { path: 'reset-password', component: ResetPasswordComponent },
    ],
  },
];
