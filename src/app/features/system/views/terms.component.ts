import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 6 · Terms of Service</p>
      <h1 class="text-3xl font-bold">Terms of Service</h1>
      <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <p>Use of Eduflow is subject to academic integrity policies. Unauthorized sharing of exam material is prohibited.</p>
        <p>By continuing, you agree to proctoring, telemetry, and AI integrity checks during exams.</p>
      </div>
    </section>
  `,
})
export class TermsComponent {}
