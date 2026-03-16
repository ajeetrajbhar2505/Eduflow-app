import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-marksheet',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 230 · Exam marksheet PDF</p>
      <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
        <h1 class="text-2xl font-bold">Marksheet preview</h1>
        <p class="text-sm text-slate-300">Downloadable PDF placeholder. Hook this to real PDF generation (e.g., pdfmake).</p>
        <div class="mt-4 h-64 rounded-xl border border-dashed border-white/20 bg-white/5"></div>
        <div class="mt-4 flex flex-wrap gap-3 text-sm">
          <button class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Download PDF</button>
          <a routerLink="/workspace/analytics/history" class="rounded-full border border-white/15 px-5 py-3 text-slate-200">Back to history</a>
        </div>
      </div>
    </section>
  `,
})
export class MarksheetComponent {}
