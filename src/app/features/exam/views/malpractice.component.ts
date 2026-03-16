import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-malpractice',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 40 · Malpractice detection</p>
      <div class="rounded-3xl border border-red-500/40 bg-red-500/10 p-6 text-red-100">
        <h1 class="text-2xl font-bold">Potential malpractice detected</h1>
        <p class="text-sm text-red-100/90">Multiple tab switches and face not detected for 30 seconds.</p>
        <ul class="mt-3 list-disc space-y-1 pl-5 text-sm">
          <li>Evidence bundle captured (screens + audio).</li>
          <li>Appeal available after submission.</li>
          <li>Timer paused. Proctor notified.</li>
        </ul>
        <div class="mt-4 flex flex-wrap gap-3 text-sm">
          <button routerLink="/workspace/exam/live" class="rounded-full bg-white px-5 py-3 font-semibold text-red-600">Return to exam</button>
          <button class="rounded-full border border-white/50 px-5 py-3">Call proctor</button>
          <button routerLink="/workspace/exam/proctor" class="rounded-full border border-white/50 px-5 py-3">View evidence</button>
        </div>
      </div>
    </section>
  `,
})
export class MalpracticeComponent {}
