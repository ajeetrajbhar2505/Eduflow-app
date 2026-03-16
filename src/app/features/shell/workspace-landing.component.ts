import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-workspace-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <div class="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-100">
      <h1 class="text-3xl font-bold">Workspace placeholder</h1>
      <p class="text-slate-300">
        Authenticated area ready for the remaining Eduflow folders (Student Hub, Exams, Analytics, Challenges, Admin, System).
      </p>
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3 text-sm text-slate-200">
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 2 · Student Hub
          <p class="text-xs text-slate-400">Dashboard, catalog, partner profile, AI assistant, settings.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 3 · Examination Experience
          <p class="text-xs text-slate-400">Instructions, live exam, proctoring, malpractice.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 4 · Performance & Analytics
          <p class="text-xs text-slate-400">Results, review grid, history, marksheet PDF.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 5 · Competitive Social
          <p class="text-xs text-slate-400">Challenges, scoreboards, victory states, leaderboards.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 6 · Admin & AI Tools
          <p class="text-xs text-slate-400">AI exam generator, quiz management, editor popups.</p>
        </div>
        <div class="rounded-xl border border-white/10 bg-white/5 p-3">
          Folder 7 · System & Legal
          <p class="text-xs text-slate-400">Policies, reconnect, issue screens, loaders.</p>
        </div>
      </div>
      <div class="flex flex-wrap gap-3">
        <a routerLink="/onboarding/hero" class="rounded-full border border-white/10 px-4 py-3 text-sm text-slate-200 hover:border-white/30">Back to onboarding</a>
      </div>
    </div>
  `,
})
export class WorkspaceLandingComponent {}
