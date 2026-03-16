import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 76 · Leaderboards</p>
      <h1 class="text-3xl font-bold">Top classes</h1>

      <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <table class="min-w-full text-left text-sm text-slate-200">
          <thead class="bg-white/10 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th class="px-4 py-3">Rank</th>
              <th class="px-4 py-3">Class</th>
              <th class="px-4 py-3">Points</th>
              <th class="px-4 py-3">Streak</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let row of rows" class="border-t border-white/5">
              <td class="px-4 py-3 font-semibold">#{{ row.rank }}</td>
              <td class="px-4 py-3">{{ row.class }}</td>
              <td class="px-4 py-3">{{ row.points }}</td>
              <td class="px-4 py-3">{{ row.streak }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class LeaderboardComponent {
  rows = [
    { rank: 1, class: 'Class A', points: 5340, streak: 'W4' },
    { rank: 2, class: 'Class B', points: 4890, streak: 'W2' },
    { rank: 3, class: 'Class C', points: 4610, streak: 'L1' },
    { rank: 4, class: 'Class D', points: 4300, streak: 'W1' },
  ];
}
