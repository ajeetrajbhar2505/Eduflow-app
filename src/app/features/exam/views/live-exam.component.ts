import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

interface Question {
  id: number;
  text: string;
  options: string[];
  answer?: number;
}

@Component({
  selector: 'app-live-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 43 · Live exam</p>
          <h1 class="text-3xl font-bold">Quant Fundamentals</h1>
          <p class="text-slate-300">60 questions · 60 mins · MCQ</p>
        </div>
        <div class="flex flex-wrap gap-2 text-sm text-slate-200">
          <span class="rounded-full bg-primary/10 px-3 py-1 text-primary">Time left: 54:21</span>
          <a routerLink="/workspace/exam/grid" class="rounded-full border border-white/15 px-3 py-1">Question grid</a>
          <a routerLink="/workspace/exam/malpractice" class="rounded-full border border-red-400/40 px-3 py-1 text-red-200">Report issue</a>
        </div>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="lg:col-span-2 space-y-4 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="flex items-center justify-between text-sm text-slate-300">
            <span>Question {{ currentIndex + 1 }} of {{ questions.length }}</span>
            <span class="rounded-full bg-white/10 px-3 py-1">Single-choice</span>
          </div>
          <p class="text-lg font-semibold">{{ currentQuestion.text }}</p>

          <div class="space-y-2">
            <label
              *ngFor="let opt of currentQuestion.options; let i = index"
              class="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-sm hover:border-primary"
            >
              <input type="radio" name="answer" [value]="i" [(ngModel)]="answers[currentQuestion.id]" class="accent-primary" />
              <span>{{ opt }}</span>
            </label>
          </div>

          <div class="flex flex-wrap gap-2 pt-2 text-sm">
            <button (click)="prev()" [disabled]="currentIndex === 0" class="rounded-full border border-white/15 px-4 py-2 text-slate-200 disabled:opacity-40">Previous</button>
            <button (click)="next()" class="rounded-full bg-primary px-4 py-2 font-semibold text-white shadow-glow-blue">Next</button>
            <button class="rounded-full border border-white/15 px-4 py-2">Flag</button>
          </div>
        </div>

        <aside class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-lg font-semibold">Session telemetry</h3>
          <ul class="text-sm text-slate-200 space-y-2">
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Camera: active · face centered</li>
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Mic: ok · background noise low</li>
            <li class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">Tabs open: 1</li>
          </ul>
          <button routerLink="/workspace/exam/proctor" class="w-full rounded-full border border-white/15 px-4 py-3 text-sm">Open proctor view</button>
        </aside>
      </div>
    </section>
  `,
})
export class LiveExamComponent {
  questions: Question[] = [
    { id: 0, text: 'Probability of getting heads twice in 2 fair tosses?', options: ['1/4', '1/2', '3/4', '1/8'] },
    { id: 1, text: 'Mean of 2, 4, 6, 8?', options: ['4', '5', '6', '7'] },
    { id: 2, text: 'Derivative of x^2?', options: ['2x', 'x', 'x^2', '0'] },
  ];
  currentIndex = 0;
  answers: Record<number, number> = {};

  get currentQuestion(): Question {
    return this.questions[this.currentIndex];
  }

  next(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex += 1;
    }
  }

  prev(): void {
    if (this.currentIndex > 0) {
      this.currentIndex -= 1;
    }
  }
}
