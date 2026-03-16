import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-loaders',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 222 · App loaders</p>
      <h1 class="text-3xl font-bold">Loading states</h1>
      <div class="grid gap-3 md:grid-cols-3">
        <div class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <ion-spinner name="crescent" class="text-primary"></ion-spinner>
          <p class="text-sm text-slate-300">Syncing exams…</p>
        </div>
        <div class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="h-10 w-full rounded-full bg-white/5">
            <div class="h-10 w-2/3 rounded-full bg-primary"></div>
          </div>
          <p class="text-sm text-slate-300">AI generating questions…</p>
        </div>
        <div class="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-4">
          <div class="h-16 w-16 animate-spin rounded-full border-4 border-white/10 border-t-primary"></div>
          <p class="text-sm text-slate-300">Proctor session starting…</p>
        </div>
      </div>
    </section>
  `,
})
export class LoadersComponent {}
