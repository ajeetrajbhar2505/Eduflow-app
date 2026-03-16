import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-hero-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-4">
        <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 219 · Hero carousel</p>
        <h2 class="text-4xl font-bold leading-tight">AI-powered examination and competitive learning for modern classrooms.</h2>
        <p class="text-lg text-slate-300">
          Browse catalogues, launch proctored exams, and connect with class battles—all surfaced with real-time analytics and integrity controls.
        </p>
        <div class="flex flex-wrap gap-3 text-sm text-slate-200">
          <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">AI drafting</span>
          <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">Live proctor</span>
          <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">Integrity signals</span>
          <span class="rounded-full border border-white/10 bg-white/5 px-3 py-2">Social challenges</span>
        </div>
        <div class="flex items-center gap-4 pt-2">
          <button routerLink="/onboarding/login" class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-blue transition hover:-translate-y-0.5">
            Start with email OTP
          </button>
          <button routerLink="/onboarding/social-loading" class="rounded-full border border-white/10 px-5 py-3 text-sm font-semibold text-slate-100 hover:border-white/30">
            Continue with Google
          </button>
          <button routerLink="/onboarding/biometric" class="rounded-full px-4 py-3 text-sm text-slate-300 hover:bg-white/5">Biometric access</button>
        </div>
      </div>

      <div class="glass-panel space-y-3 rounded-2xl p-4 shadow-xl">
        <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Launch checklist</p>
        <div class="grid gap-3">
          <div *ngFor="let item of steps" class="rounded-xl border border-white/10 bg-white/5 p-3">
            <div class="flex items-center justify-between text-sm font-semibold">
              <span>{{ item.title }}</span>
              <span class="text-xs text-slate-400">{{ item.id }}</span>
            </div>
            <p class="mt-1 text-xs text-slate-300">{{ item.copy }}</p>
          </div>
        </div>
        <div class="flex items-center justify-between rounded-xl border border-primary/20 bg-primary/10 px-3 py-3 text-sm text-primary">
          <span>Trusted by 40+ institutions</span>
          <span class="rounded-full bg-white/10 px-2 py-1 text-xs text-white">v1.0 beta</span>
        </div>
      </div>
    </section>
  `,
})
export class HeroLandingComponent {
  constructor(private readonly data: DataService) {}

  get steps() {
    return this.data.onboarding;
  }
}
