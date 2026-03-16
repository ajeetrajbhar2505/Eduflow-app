import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-challenge-hub',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 209 · Competitive challenge hub</p>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 class="text-3xl font-bold">Class vs Class battles</h1>
          <p class="text-slate-300">Create or join live challenges to climb leaderboards.</p>
        </div>
        <a routerLink="/workspace/challenges/create" class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-blue">Create challenge</a>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs text-slate-400">Active</p>
          <h3 class="text-xl font-semibold">Data Sprint · Class A vs B</h3>
          <p class="text-sm text-slate-300">Live now · 12 mins left</p>
          <a routerLink="/workspace/challenges/live" class="mt-2 inline-block text-sm text-primary">Open scoreboard</a>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs text-slate-400">Upcoming</p>
          <h3 class="text-xl font-semibold">Quant Blitz · Tomorrow</h3>
          <p class="text-sm text-slate-300">Join window closes in 3h</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs text-slate-400">Completed</p>
          <h3 class="text-xl font-semibold">Verbal Duel · Yesterday</h3>
          <a routerLink="/workspace/challenges/victory" class="mt-2 inline-block text-sm text-primary">See celebration</a>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 text-sm">
        <a routerLink="/workspace/challenges/leaderboard" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">Leaderboards</a>
        <a routerLink="/workspace/challenges/history" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">Match history</a>
      </div>
    </section>
  `,
})
export class ChallengeHubComponent {}
