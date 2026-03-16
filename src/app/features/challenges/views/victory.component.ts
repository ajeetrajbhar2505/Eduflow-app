import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4 text-center">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 108 · Class victory celebration</p>
      <div class="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 via-ink to-ink p-10">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.3),transparent_35%)]"></div>
        <h1 class="text-4xl font-extrabold text-amber-200 drop-shadow">Class A wins!</h1>
        <p class="mt-2 text-slate-200">Final score 1340 vs 1210 · Trophy unlocked</p>
        <div class="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
          <a routerLink="/workspace/challenges/leaderboard" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">View leaderboard</a>
          <a routerLink="/workspace/challenges/history" class="rounded-full border border-white/20 px-5 py-3 text-slate-200">Match history</a>
          <a routerLink="/workspace/challenges/create" class="rounded-full border border-white/20 px-5 py-3 text-slate-200">Create rematch</a>
        </div>
      </div>
    </section>
  `,
})
export class VictoryComponent {}
