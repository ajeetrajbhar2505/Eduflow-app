import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-exam-results',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 215 · Exam results summary</p>
      <div class="grid gap-4 lg:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-sm text-slate-300">Total score</p>
          <h1 class="text-4xl font-bold">87%</h1>
          <p class="text-xs text-slate-400">Pass threshold: 70%</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-sm text-slate-300">Accuracy</p>
          <h1 class="text-4xl font-bold">91%</h1>
          <p class="text-xs text-slate-400">Speed-weighted</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-sm text-slate-300">Percentile</p>
          <h1 class="text-4xl font-bold">96th</h1>
          <p class="text-xs text-slate-400">vs 1,240 peers</p>
        </div>
      </div>

      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold">Performance breakdown</h3>
          <a routerLink="/workspace/analytics/grid" class="text-sm text-primary">Open review grid</a>
        </div>
        <div class="grid gap-3 md:grid-cols-3 text-sm text-slate-200 mt-3">
          <div class="rounded-xl border border-white/10 bg-white/5 p-3">Quant · 88%</div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-3">Verbal · 84%</div>
          <div class="rounded-xl border border-white/10 bg-white/5 p-3">Data · 90%</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3 text-sm">
        <a routerLink="/workspace/analytics/marksheet" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Download marksheet</a>
        <a routerLink="/workspace/analytics/detail" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">Review answers</a>
        <a routerLink="/workspace/analytics/submit-review" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">Submit feedback</a>
        <a routerLink="/workspace/analytics/history" class="text-slate-300 hover:text-white">History</a>
      </div>
    </section>
  `,
})
export class ExamResultsComponent {}
