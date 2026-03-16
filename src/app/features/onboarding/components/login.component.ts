import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OnboardingFlowService } from '../../../core/services/onboarding-flow.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonicModule],
  template: `
    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-4">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 218 · Modern login</p>
        <h2 class="text-3xl font-bold">Sign in with email OTP or trusted providers.</h2>
        <p class="text-slate-300">We preflight device health, consent to biometrics, and prepare a secure examination session.</p>

        <form [formGroup]="form" (ngSubmit)="sendOtp()" class="glass-panel space-y-4 rounded-2xl p-5">
          <div class="grid gap-3 md:grid-cols-2">
            <label class="flex flex-col gap-1 text-sm">
              <span>Email</span>
              <input
                type="email"
                formControlName="email"
                placeholder="student@campus.edu"
                class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-primary focus:outline-none"
                required
              />
              <small class="text-xs text-red-300" *ngIf="form.controls.email.invalid && form.controls.email.touched">Enter a valid email.</small>
            </label>
            <label class="flex flex-col gap-1 text-sm">
              <span>Role</span>
              <select
                formControlName="role"
                class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-primary focus:outline-none"
              >
                <option class="text-slate-900" value="student">Student</option>
                <option class="text-slate-900" value="instructor">Instructor</option>
                <option class="text-slate-900" value="admin">Admin</option>
              </select>
            </label>
          </div>

          <div class="flex flex-wrap gap-3 text-sm text-slate-200">
            <label class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <input type="checkbox" formControlName="remember" class="accent-primary" />
              <span>Trust this device for 30 days</span>
            </label>
            <label class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <input type="checkbox" formControlName="enableBiometric" class="accent-primary" />
              <span>Enable fingerprint quick access</span>
            </label>
          </div>

          <div class="flex flex-wrap items-center gap-3">
            <button type="submit" [disabled]="form.invalid" class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-50">
              Send OTP
            </button>
            <button type="button" routerLink="/onboarding/social-loading" class="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-white/30">
              Continue with Google
            </button>
            <button type="button" routerLink="/onboarding/reset-password" class="text-sm text-slate-300 hover:text-white">Forgot password?</button>
          </div>
        </form>

        <div class="grid gap-3 md:grid-cols-3">
          <div class="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
            Device readiness checks
            <p class="text-xs text-slate-400">Camera + mic + network latency probes.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
            One-tap biometrics
            <p class="text-xs text-slate-400">Fast unlock on returning sessions.</p>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
            Policy acceptance
            <p class="text-xs text-slate-400">Updated Terms + Privacy every session.</p>
          </div>
        </div>
      </div>

      <aside class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Trusted session</p>
        <div class="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/10 px-3 py-3 text-sm text-primary">
          <ion-icon name="shield-checkmark-outline" class="text-xl"></ion-icon>
          End-to-end encryption is active.
        </div>
        <div class="grid gap-2 text-sm text-slate-200">
          <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Device posture · ok</div>
          <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Zero-trust cookie · fresh</div>
          <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Regional edge · us-east</div>
        </div>
      </aside>
    </div>
  `,
})
export class LoginComponent {
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    role: ['student', Validators.required],
    remember: [true],
    enableBiometric: [true],
  });

  constructor(private readonly fb: FormBuilder, private readonly flow: OnboardingFlowService, private readonly router: Router) {}

  sendOtp(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, enableBiometric, role } = this.form.value;
    if (email) {
      this.flow.setEmail(email);
    }
    if (role) {
      this.flow.setRole(role as 'student' | 'instructor' | 'admin');
    }
    if (enableBiometric) {
      this.flow.enableBiometric();
    }
    this.router.navigate(['/onboarding/otp']);
  }
}
