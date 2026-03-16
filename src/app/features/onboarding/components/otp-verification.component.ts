import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { OnboardingFlowService } from '../../../core/services/onboarding-flow.service';

@Component({
  selector: 'app-otp-verification',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonicModule],
  template: `
    <section class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 223 · OTP verification</p>
        <h2 class="text-3xl font-bold">Secure your session with a 6-digit OTP.</h2>
        <p class="text-slate-300">Check your inbox. We also support SMS fallback and biometric unlock if you enabled it.</p>

        <div class="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <div class="flex items-center gap-2">
            <div class="h-10 w-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-semibold">OTP</div>
            <div>
              <p class="font-semibold">Sent to {{ flow.email || 'your email' }}</p>
              <p class="text-xs text-slate-400">Code expires in 05:00</p>
            </div>
          </div>
        </div>
      </div>

      <form [formGroup]="form" (ngSubmit)="verify()" class="glass-panel space-y-4 rounded-2xl p-5">
        <label class="flex flex-col gap-2 text-sm">
          <span>Enter 6-digit code</span>
          <input
            type="text"
            maxlength="6"
            formControlName="code"
            inputmode="numeric"
            class="text-center tracking-[0.3em] rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-2xl font-semibold text-white focus:border-primary focus:outline-none"
            placeholder="246810"
          />
          <small class="text-xs text-red-300" *ngIf="error">{{ error }}</small>
        </label>

        <label class="flex items-center gap-2 text-sm text-slate-200">
          <input type="checkbox" formControlName="accept" class="accent-primary" />
          <span>I accept the updated Terms of Service and Privacy Policy.</span>
        </label>

        <div class="flex flex-wrap items-center gap-3">
          <button type="submit" [disabled]="form.invalid" class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-60">
            Verify & enter workspace
          </button>
          <button type="button" routerLink="/onboarding/biometric" class="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-white/30">
            Use fingerprint
          </button>
          <button type="button" routerLink="/onboarding/login" class="text-sm text-slate-300 hover:text-white">Back to login</button>
        </div>

        <div class="flex items-center gap-2 text-xs text-slate-400">
          <ion-icon name="time-outline"></ion-icon>
          Resend available in 28s.
        </div>
      </form>
    </section>
  `,
})
export class OtpVerificationComponent {
  error = '';

  readonly form = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]],
    accept: [true, Validators.requiredTrue],
  });

  constructor(
    private readonly fb: FormBuilder,
    public readonly flow: OnboardingFlowService,
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  verify(): void {
    this.error = '';
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const code = this.form.value.code || '';
    if (!this.flow.validateOtp(code)) {
      this.error = 'Invalid code. Try 246810 while mock APIs are connected.';
      return;
    }

    const email = this.flow.email;
    if (!email) {
      this.error = 'Session expired. Start again from login.';
      this.router.navigate(['/onboarding/login']);
      return;
    }

    this.auth.login(email, this.flow.userRole).subscribe(() => {
      this.router.navigateByUrl('/workspace');
    });
  }
}
