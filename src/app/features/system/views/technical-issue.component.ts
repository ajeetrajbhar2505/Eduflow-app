import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-technical-issue',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4 text-center">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 221 · Technical issue</p>
      <div class="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 class="text-3xl font-bold">We hit a snag</h1>
        <p class="text-slate-300">Incident ID: INC-2048. Logs are ready to upload.</p>
        <div class="mt-4 flex flex-wrap justify-center gap-3 text-sm">
          <button class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Retry</button>
          <button class="rounded-full border border-white/20 px-5 py-3 text-slate-200">Upload logs</button>
        </div>
      </div>
    </section>
  `,
})
export class TechnicalIssueComponent {}
