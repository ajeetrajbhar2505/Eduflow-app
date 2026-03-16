import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService } from '../../../core/services/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 227 · Student dashboard</p>
          <h1 class="text-3xl font-bold">Welcome back, learner.</h1>
          <p class="text-slate-300">Track live exams, challenges, and AI study nudges.</p>
        </div>
        <div class="flex flex-wrap gap-2 text-sm text-slate-200">
          <button routerLink="/workspace/student-hub/catalog" class="rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-glow-blue">Browse exams</button>
          <button routerLink="/workspace/student-hub/ai-chat" class="rounded-full border border-white/15 px-4 py-2">Ask AI</button>
        </div>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Upcoming</p>
          <h3 class="text-2xl font-semibold">{{ upcoming.length }}</h3>
          <p class="text-sm text-slate-300">Booked exams</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Completed</p>
          <h3 class="text-2xl font-semibold">{{ completed.length }}</h3>
          <p class="text-sm text-slate-300">Awaiting review grid</p>
        </div>
        <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
          <p class="text-xs uppercase tracking-[0.25em] text-slate-400">Integrity</p>
          <h3 class="text-2xl font-semibold">99.1%</h3>
          <p class="text-sm text-slate-300">Session integrity score</p>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-semibold">Live & upcoming exams</h3>
            <a routerLink="/workspace/student-hub/catalog" class="text-sm text-primary">See all</a>
          </div>
          <div class="grid gap-3">
            <div *ngFor="let exam of upcoming" class="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm text-slate-300">{{ exam.partner }}</p>
                  <h4 class="text-lg font-semibold">{{ exam.title }}</h4>
                </div>
                <span class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{{ exam.status | titlecase }}</span>
              </div>
              <p class="text-xs text-slate-400">{{ exam.date | date:'medium' }} · Mode: {{ exam.mode }}</p>
              <div class="mt-2 flex gap-2 text-sm text-slate-200">
                <a routerLink="/workspace/exam/instructions" class="rounded-full bg-primary px-3 py-2 text-white shadow-glow-blue">Start</a>
                <a routerLink="/workspace/exam/grid" class="rounded-full border border-white/15 px-3 py-2">Question grid</a>
              </div>
            </div>
          </div>
        </div>
        <div class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">AI study nudges</h3>
          <ul class="space-y-2 text-sm text-slate-200">
            <li class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Revise probability · 15 mins</li>
            <li class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Watch proctoring tips · 4 mins</li>
            <li class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Attempt 5 practice MCQs</li>
          </ul>
          <button routerLink="/workspace/student-hub/ai-chat" class="w-full rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white shadow-glow-blue">Open AI chat</button>
        </div>
      </div>
    </section>
  `,
})
export class DashboardComponent {
  upcoming = this.data.exams.filter((e) => e.status !== 'completed');
  completed = this.data.exams.filter((e) => e.status === 'completed');

  constructor(private readonly data: DataService) {}
}
