import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DataService, PartnerProfile } from '../../../core/services/data.service';

@Component({
  selector: 'app-partner-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 116 · Partner profile</p>
      <h1 class="text-3xl font-bold">Partner institution</h1>
      <p class="text-slate-300">Integrity scores, reviews, and active exams.</p>

      <div class="grid gap-3 lg:grid-cols-3">
        <ng-container *ngFor="let partner of partners">
          <div class="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-semibold">{{ partner.name }}</h3>
              <span class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">{{ partner.rating }}★</span>
            </div>
            <p class="text-sm text-slate-300">{{ partner.exams }} exams onboarded</p>
            <ul class="text-xs text-slate-300 space-y-1">
              <li *ngFor="let item of partner.achievements" class="rounded-lg border border-white/10 bg-white/5 px-3 py-2">{{ item }}</li>
            </ul>
            <div class="flex gap-2 text-sm text-slate-200">
              <button class="rounded-full bg-primary px-3 py-2 text-white">View profile</button>
              <button class="rounded-full border border-white/15 px-3 py-2">Follow</button>
            </div>
          </div>
        </ng-container>
      </div>
    </section>
  `,
})
export class PartnerProfileComponent {
  partners: PartnerProfile[];

  constructor(private readonly data: DataService) {
    this.partners = data.partners;
  }
}
