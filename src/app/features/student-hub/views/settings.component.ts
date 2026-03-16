import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div>
        <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 142 · Profile & settings</p>
        <h1 class="text-3xl font-bold">Personalize your experience</h1>
      </div>

      <div class="grid gap-4 lg:grid-cols-2">
        <div class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Profile</h3>
          <label class="flex flex-col gap-2 text-sm">
            <span>Display name</span>
            <input class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" [(ngModel)]="displayName" />
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" class="accent-primary" [(ngModel)]="notifications" />
            <span>Notify me about new challenges</span>
          </label>
          <button class="w-fit rounded-full bg-primary px-4 py-3 text-sm font-semibold text-white">Save</button>
        </div>

        <div class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
          <h3 class="text-xl font-semibold">Privacy</h3>
          <label class="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" class="accent-primary" [(ngModel)]="biometric" />
            <span>Enable biometric fast login</span>
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-200">
            <input type="checkbox" class="accent-primary" [(ngModel)]="shareProfile" />
            <span>Allow classmates to view my scores</span>
          </label>
          <button class="w-fit rounded-full border border-white/15 px-4 py-3 text-sm">Export data</button>
        </div>
      </div>
    </section>
  `,
})
export class SettingsComponent {
  displayName = 'Student';
  notifications = true;
  biometric = true;
  shareProfile = false;
}
