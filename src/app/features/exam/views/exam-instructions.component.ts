import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-exam-instructions',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 80 · Exam instructions</p>
      <h1 class="text-3xl font-bold">Read before you start</h1>
      <p class="text-slate-300">Integrity, timing, and support details.</p>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Rules</h3>
          <ul class="list-disc space-y-2 pl-5 text-sm text-slate-200">
            <li>Exam duration: 60 mins. Auto-submit on timeout.</li>
            <li>One device only. Camera + mic required.</li>
            <li>No external tabs; violations trigger malpractice flow.</li>
          </ul>
        </div>
        <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Proctoring</h3>
          <p class="text-sm text-slate-200">Live proctor + AI vision. Keep face centered. Background noise is monitored.</p>
          <div class="rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary">Network health: Good · Latency 42ms</div>
        </div>
      </div>

      <div class="flex flex-wrap gap-3">
        <button routerLink="/workspace/exam/live" class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-blue">Start exam</button>
        <button routerLink="/workspace/exam/proctor" class="rounded-full border border-white/15 px-5 py-3 text-sm text-slate-200">Camera check</button>
      </div>
    </section>
  `,
})
export class ExamInstructionsComponent {}
