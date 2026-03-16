import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-social-loading',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <div class="grid gap-6 lg:grid-cols-2">
      <div class="space-y-2">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 216 · Social loading</p>
        <h2 class="text-3xl font-bold">Connecting to Google Workspace…</h2>
        <p class="text-slate-300">We are exchanging tokens and applying Eduflow security policies.</p>
        <div class="flex items-center gap-3 text-sm text-slate-200">
          <ion-icon name="shield-checkmark-outline" class="text-lg text-primary"></ion-icon>
          <span>Scoped permissions only · calendar, profile, email</span>
        </div>
      </div>

      <div class="glass-panel rounded-2xl p-5 text-center">
        <div class="relative mx-auto flex h-40 w-40 items-center justify-center">
          <div class="absolute h-32 w-32 animate-pulse rounded-full bg-primary/30 blur-3xl"></div>
          <div class="h-16 w-16 animate-spin rounded-2xl border-4 border-white/10 border-t-primary"></div>
        </div>
        <p class="text-sm text-slate-200">Please keep this tab open. You will be redirected automatically.</p>
        <div class="mt-4 flex items-center justify-center gap-3">
          <button (click)="goOtp()" class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white">Continue</button>
          <button routerLink="/onboarding/login" class="text-sm text-slate-300 hover:text-white">Choose another method</button>
        </div>
      </div>
    </div>
  `,
})
export class SocialLoadingComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.goOtp(), 2500);
  }

  goOtp(): void {
    this.router.navigate(['/onboarding/otp']);
  }
}
