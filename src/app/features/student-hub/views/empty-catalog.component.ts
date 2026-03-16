import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-empty-catalog',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <div class="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-white/15 bg-white/5 p-10 text-center text-slate-200">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 73 · Empty catalog</p>
      <h2 class="text-3xl font-bold">No exams yet.</h2>
      <p class="text-slate-300 max-w-xl">Admins are preparing your next challenge. Meanwhile, practice with AI or explore partner institutions.</p>
      <div class="flex flex-wrap items-center justify-center gap-3 text-sm">
        <a routerLink="/workspace/student-hub/ai-chat" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Start practice chat</a>
        <a routerLink="/workspace/student-hub/partner" class="rounded-full border border-white/15 px-5 py-3">View partners</a>
        <a routerLink="/workspace/student-hub/catalog" class="text-slate-300 hover:text-white">Reload catalog</a>
      </div>
    </div>
  `,
})
export class EmptyCatalogComponent {}
