import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-exam-history',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 229 · Exam history</p>
      <h1 class="text-3xl font-bold">Past performances</h1>

      <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div *ngFor="let exam of history" class="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-200">
          <div>
            <p class="font-semibold">{{ exam.title }}</p>
            <p class="text-xs text-slate-400">{{ exam.date | date:'mediumDate' }}</p>
          </div>
          <div class="flex items-center gap-2">
            <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">{{ exam.score }}%</span>
            <a routerLink="/workspace/analytics/marksheet" class="rounded-full border border-white/15 px-3 py-1">PDF</a>
            <a routerLink="/workspace/analytics/detail" class="rounded-full border border-white/15 px-3 py-1">Review</a>
          </div>
        </div>
      </div>
    </section>
  `,
})
export class ExamHistoryComponent {
  history = [
    { title: 'Quant Fundamentals', date: '2026-03-05T10:00:00Z', score: 87 },
    { title: 'Data Structures', date: '2026-02-12T10:00:00Z', score: 90 },
    { title: 'Image-based Anatomy', date: '2026-01-22T14:00:00Z', score: 82 },
  ];
}
