import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { OnboardingFlowService } from '../../../core/services/onboarding-flow.service';

@Component({
  selector: 'app-biometric',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-3">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 180 · Biometric access</p>
        <h2 class="text-3xl font-bold">Fingerprint unlock for returning sessions.</h2>
        <p class="text-slate-300">Enable biometric hardware to reduce friction when rejoining proctored exams.</p>
        <ul class="list-disc space-y-2 pl-6 text-sm text-slate-200">
          <li>Secure enclave, fallback to OTP if fingerprint fails.</li>
          <li>We never store raw biometric data; only device attestation.</li>
          <li>Supports iOS TouchID, Android Biometrics, and WebAuthn.</li>
        </ul>
      </div>

      <div class="glass-panel flex flex-col items-center justify-center gap-4 rounded-2xl p-6 text-center">
        <div class="relative">
          <div class="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
          <div class="absolute inset-3 animate-pulse rounded-full bg-primary/10"></div>
          <div class="relative flex h-28 w-28 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
            <ion-icon name="finger-print" class="text-4xl text-primary"></ion-icon>
          </div>
        </div>
        <p class="text-sm text-slate-200">{{ status }}</p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <button
            class="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-glow-blue disabled:opacity-50"
            (click)="verify()"
            [disabled]="isProcessing"
          >
            Verify fingerprint
          </button>
          <button routerLink="/onboarding/otp" class="text-sm text-slate-300 hover:text-white">Use OTP instead</button>
        </div>
      </div>
    </section>
  `,
})
export class BiometricComponent {
  status = 'Waiting for secure prompt…';
  isProcessing = false;

  constructor(private readonly flow: OnboardingFlowService, private readonly router: Router) {}

  verify(): void {
    this.isProcessing = true;
    this.status = 'Listening for device attestation…';
    setTimeout(() => {
      if (!this.flow.canUseBiometric()) {
        this.status = 'Biometrics not enabled on this session. Switch to OTP.';
        this.isProcessing = false;
        return;
      }
      this.status = 'Fingerprint confirmed. Redirecting…';
      this.router.navigate(['/onboarding/otp']);
    }, 1400);
  }
}
