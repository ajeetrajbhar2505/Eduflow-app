import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService, Exam } from '../../../core/services/data.service';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 226 · Exam catalog</p>
          <h1 class="text-3xl font-bold">Browse subject-wise tests</h1>
          <p class="text-slate-300">Filter by partner institution, mode, and date.</p>
        </div>
        <div class="flex flex-wrap gap-2 text-sm text-slate-200">
          <button class="rounded-full border border-white/15 px-4 py-2">All subjects</button>
          <button class="rounded-full border border-white/15 px-4 py-2">STEM</button>
          <button class="rounded-full border border-white/15 px-4 py-2">Humanities</button>
          <button class="rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-glow-blue">Schedule</button>
        </div>
      </div>

      <div class="grid gap-3 lg:grid-cols-2">
        <ng-container *ngFor="let exam of exams">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-slate-300">{{ exam.partner }}</p>
                <h3 class="text-xl font-semibold">{{ exam.title }}</h3>
              </div>
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{{ exam.status | titlecase }}</span>
            </div>
            <p class="text-xs text-slate-400">{{ exam.date | date:'medium' }}</p>
            <div class="flex items-center gap-2 text-xs text-slate-300">
              <ion-icon name="shield-checkmark-outline" class="text-primary"></ion-icon>
              Integrity proctor · Mode: {{ exam.mode }}
            </div>
            <div class="flex gap-2 text-sm text-slate-200">
              <button class="rounded-full bg-white/10 px-3 py-2" routerLink="/workspace/exam/instructions">Preview</button>
              <button class="rounded-full bg-primary px-3 py-2 text-white shadow-glow-blue" routerLink="/workspace/exam/instructions">Start</button>
            </div>
          </div>
        </ng-container>
      </div>

      <div class="flex items-center gap-3 text-sm text-slate-300">
        <ion-icon name="alert-circle-outline" class="text-primary"></ion-icon>
        Need friendlier state? <a routerLink="/workspace/student-hub/catalog-empty" class="text-primary">See empty catalog</a>
      </div>
    </section>
  `,
})
export class CatalogComponent {
  exams: Exam[];

  constructor(private readonly data: DataService) {
    this.exams = data.exams;
  }
}
