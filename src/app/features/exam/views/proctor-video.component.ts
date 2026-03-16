import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-proctor-video',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 39 · Proctor video call</p>
          <h1 class="text-3xl font-bold">Live proctor view</h1>
          <p class="text-slate-300">Camera + mic status, screen share optional.</p>
        </div>
        <a routerLink="/workspace/exam/live" class="rounded-full border border-white/15 px-4 py-2 text-sm">Back to exam</a>
      </div>

      <div class="grid gap-4 lg:grid-cols-3">
        <div class="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-primary/20 via-ink to-ink">
          <div class="absolute inset-0 flex items-center justify-center text-slate-200">Video stream placeholder</div>
        </div>
        <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <div class="flex items-center justify-between rounded-xl border border-green-400/30 bg-green-500/10 px-3 py-2">
            <span>Camera · Active</span><span class="text-green-200">720p</span>
          </div>
          <div class="flex items-center justify-between rounded-xl border border-sky-400/30 bg-sky-500/10 px-3 py-2">
            <span>Microphone · OK</span><span class="text-sky-200">-32 dB</span>
          </div>
          <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Screen share · Idle</div>
          <div class="rounded-xl border border-white/10 bg-white/5 px-3 py-2">Bandwidth · 8.4 Mbps</div>
        </div>
        <div class="space-y-2 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
          <h3 class="text-base font-semibold">Proctor chat</h3>
          <div class="h-36 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-slate-300">No messages yet</div>
          <button class="w-full rounded-full bg-primary px-4 py-3 font-semibold text-white shadow-glow-blue">Ping proctor</button>
        </div>
      </div>
    </section>
  `,
})
export class ProctorVideoComponent {}
