import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-question-grid',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 190 · Question navigation grid</p>
          <h1 class="text-3xl font-bold">Jump to any question</h1>
        </div>
        <a routerLink="/workspace/exam/live" class="rounded-full border border-white/15 px-4 py-2 text-sm">Back to exam</a>
      </div>

      <div class="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div class="grid grid-cols-6 gap-2 text-sm">
          <button
            *ngFor="let q of questions"
            class="rounded-lg border border-white/10 bg-white/5 py-3 text-center font-semibold text-slate-100 hover:border-primary"
            [ngClass]="{
              'bg-primary/20 text-primary border-primary/40': q.status === 'answered',
              'bg-amber-500/20 text-amber-200 border-amber-500/40': q.status === 'flagged'
            }"
          >
            {{ q.id + 1 }}
          </button>
        </div>
        <div class="flex flex-wrap gap-3 text-xs text-slate-300">
          <span class="rounded-full bg-primary/20 px-3 py-1 text-primary">Answered</span>
          <span class="rounded-full bg-amber-500/20 px-3 py-1 text-amber-200">Flagged</span>
          <span class="rounded-full bg-white/10 px-3 py-1">Unseen</span>
        </div>
      </div>
    </section>
  `,
})
export class QuestionGridComponent {
  questions = Array.from({ length: 30 }).map((_, i) => ({ id: i, status: i % 3 === 0 ? 'answered' : i % 5 === 0 ? 'flagged' : 'unseen' }));
}
