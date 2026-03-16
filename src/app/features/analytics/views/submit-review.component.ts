import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-submit-review',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 45 · Submit exam review</p>
      <h1 class="text-3xl font-bold">Share feedback</h1>

      <form class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <label class="flex flex-col gap-2">
          <span>Overall experience</span>
          <select [(ngModel)]="rating" name="rating" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <option class="text-slate-900" *ngFor="let r of [5,4,3,2,1]" [value]="r">{{ r }} / 5</option>
          </select>
        </label>
        <label class="flex flex-col gap-2">
          <span>Comments</span>
          <textarea [(ngModel)]="comments" name="comments" rows="4" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3"></textarea>
        </label>
        <button type="button" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Submit</button>
      </form>
    </section>
  `,
})
export class SubmitReviewComponent {
  rating = 5;
  comments = '';
}
