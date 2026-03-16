import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <div class="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-primary/20 via-ink-muted to-ink p-8 shadow-xl">
      <div class="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_50%_120%,rgba(124,58,237,.25),transparent_60%)]"></div>
      <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div class="space-y-4 md:max-w-xl">
          <p class="text-sm uppercase tracking-[0.3em] text-slate-400">Screen 69 · Splash</p>
          <h1 class="text-4xl font-bold leading-tight md:text-5xl">Eduflow launches secure AI examinations.</h1>
          <p class="text-lg text-slate-300">
            Device checks, network readiness, and trust banners prepare learners before they land in the experience.
          </p>
          <div class="flex flex-wrap gap-3 text-sm text-slate-300">
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Integrity lock</span>
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Zero-trust session</span>
            <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1">Telemetry ready</span>
          </div>
          <div class="flex items-center gap-3 pt-2">
            <button
              class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-blue transition hover:-translate-y-0.5"
              (click)="goNext()"
            >
              Continue
            </button>
            <button
              class="rounded-full border border-white/15 px-4 py-3 text-sm font-medium text-slate-200 hover:border-white/30"
              (click)="goNext('login')"
            >
              Skip intro
            </button>
          </div>
        </div>
        <div class="relative mt-6 flex h-64 flex-1 items-center justify-center md:mt-0">
          <div class="absolute h-48 w-48 animate-pulse rounded-full bg-primary/30 blur-3xl"></div>
          <div class="relative flex h-52 w-52 items-center justify-center rounded-[28px] border border-white/15 bg-white/5 backdrop-blur">
            <div class="absolute inset-4 animate-spin-slow rounded-3xl border border-dashed border-white/20"></div>
            <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow-blue"></div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
      .animate-spin-slow {
        animation: spin 6s linear infinite;
      }
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class SplashScreenComponent implements OnInit {
  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    setTimeout(() => this.goNext(), 2200);
  }

  goNext(next: 'hero' | 'login' = 'hero'): void {
    this.router.navigate(['/onboarding', next]);
  }
}
