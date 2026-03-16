import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 214 · Privacy policy</p>
      <h1 class="text-3xl font-bold">Privacy Policy</h1>
      <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <p>We collect only what is needed for exams: account info, telemetry during proctoring, and performance data.</p>
        <p>Data retention: 12 months unless required for compliance. You can request deletion anytime.</p>
      </div>
    </section>
  `,
})
export class PrivacyComponent {}
