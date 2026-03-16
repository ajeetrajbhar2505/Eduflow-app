import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reconnect',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4 text-center">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 83 · Re-connect</p>
      <div class="rounded-3xl border border-white/10 bg-white/5 p-8">
        <h1 class="text-3xl font-bold">Reconnecting…</h1>
        <p class="text-slate-300">We will resume your exam as soon as the network is back.</p>
        <div class="mt-4 flex justify-center gap-3 text-sm">
          <button class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Retry now</button>
          <button class="rounded-full border border-white/20 px-5 py-3 text-slate-200">Contact support</button>
        </div>
      </div>
    </section>
  `,
})
export class ReconnectComponent {}
