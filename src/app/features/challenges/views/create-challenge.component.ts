import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-create-challenge',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 153 · Create new challenge</p>
      <h1 class="text-3xl font-bold">Set up a class battle</h1>

      <form class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <label class="flex flex-col gap-2">
          <span>Challenge name</span>
          <input [(ngModel)]="name" name="name" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Data Sprint" />
        </label>
        <label class="flex flex-col gap-2">
          <span>Class A vs Class B</span>
          <input [(ngModel)]="classA" name="classA" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Class A" />
          <input [(ngModel)]="classB" name="classB" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Class B" />
        </label>
        <label class="flex flex-col gap-2">
          <span>Start time</span>
          <input type="datetime-local" [(ngModel)]="start" name="start" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" />
        </label>
        <button type="button" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Create challenge</button>
      </form>
    </section>
  `,
})
export class CreateChallengeComponent {
  name = 'Data Sprint';
  classA = 'Class A';
  classB = 'Class B';
  start = '';
}
