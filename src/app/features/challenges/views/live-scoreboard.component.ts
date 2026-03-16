import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-live-scoreboard',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 177 · Live challenge scoreboard</p>
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold">Data Sprint · Live</h1>
          <p class="text-slate-300">Real-time comparison between Class A and Class B.</p>
        </div>
        <span class="rounded-full bg-emerald-500/20 px-3 py-1 text-emerald-200 text-sm">Live</span>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Scoreboard</h3>
          <div class="mt-3 space-y-2 text-sm text-slate-200">
            <div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span>Class A</span>
              <strong>1280 pts</strong>
            </div>
            <div class="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <span>Class B</span>
              <strong>1190 pts</strong>
            </div>
          </div>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Live feed</h3>
          <ul class="space-y-2 text-sm text-slate-200">
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">A: +20 pts · Correct MCQ streak</li>
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">B: +15 pts · Speed bonus</li>
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">A: -5 pts · Timeout penalty</li>
          </ul>
          <div class="mt-3 text-xs text-slate-400">Auto-refresh every 5s (mock).</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 text-sm">
        <a routerLink="/workspace/challenges/victory" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">End & celebrate</a>
        <a routerLink="/workspace/challenges/history" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">View history</a>
      </div>
    </section>
  `,
})
export class LiveScoreboardComponent {}
