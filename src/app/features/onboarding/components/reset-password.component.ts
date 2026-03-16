import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, IonicModule],
  template: `
    <section class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 212 · Reset password</p>
        <h2 class="text-3xl font-bold">Recover access with secure links.</h2>
        <p class="text-slate-300">We send a time-boxed recovery link and also support security questions for proctored exams.</p>
      </div>

      <form [formGroup]="form" (ngSubmit)="send()" class="glass-panel space-y-4 rounded-2xl p-5">
        <label class="flex flex-col gap-2 text-sm">
          <span>Institutional email</span>
          <input
            type="email"
            formControlName="email"
            placeholder="you@campus.edu"
            class="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-primary focus:outline-none"
          />
          <small class="text-xs text-red-300" *ngIf="form.controls.email.invalid && form.controls.email.touched">Enter a valid email.</small>
        </label>

        <div class="flex items-center gap-2 text-sm text-slate-200">
          <ion-icon name="mail-outline"></ion-icon>
          <span>Link expires in 20 minutes. OTP fallback available.</span>
        </div>

        <div class="flex flex-wrap items-center gap-3">
          <button type="submit" [disabled]="form.invalid" class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-50">
            Send recovery link
          </button>
          <a routerLink="/onboarding/login" class="text-sm text-slate-300 hover:text-white">Back to login</a>
        </div>
      </form>
    </section>
  `,
})
export class ResetPasswordComponent {
  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private readonly fb: FormBuilder) {}

  send(): void {
    this.form.markAllAsTouched();
  }
}
