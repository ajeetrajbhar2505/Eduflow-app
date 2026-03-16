import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

interface Message {
  from: 'user' | 'ai';
  text: string;
}

@Component({
  selector: 'app-ai-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <section class="space-y-4">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 55 · AI chat study assistant</p>
          <h1 class="text-3xl font-bold">Ask anything about your next exam.</h1>
        </div>
        <span class="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">Gemini mock</span>
      </div>

      <div class="rounded-3xl border border-white/10 bg-white/5 p-4">
        <div class="flex flex-col gap-3 max-h-[420px] overflow-y-auto pr-2">
          <div *ngFor="let msg of messages" [ngClass]="msg.from === 'user' ? 'items-end' : 'items-start'" class="flex">
            <div
              class="max-w-xl rounded-2xl px-4 py-3 text-sm"
              [ngClass]="msg.from === 'user' ? 'bg-primary text-white shadow-glow-blue' : 'bg-white/10 border border-white/10 text-slate-100'"
            >
              {{ msg.text }}
            </div>
          </div>
        </div>
        <form (ngSubmit)="send()" class="mt-4 flex gap-2">
          <input
            type="text"
            [(ngModel)]="draft"
            name="draft"
            placeholder="e.g. Give me 3 tips for probability MCQs"
            class="flex-1 rounded-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"
          />
          <button type="submit" class="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-glow-blue">Send</button>
        </form>
      </div>
    </section>
  `,
})
export class AiChatComponent {
  messages: Message[] = [
    { from: 'ai', text: 'Hey! I can help you prep for Quant Fundamentals. Want a 10-minute sprint?' },
  ];
  draft = '';

  send(): void {
    if (!this.draft.trim()) return;
    this.messages.push({ from: 'user', text: this.draft.trim() });
    const echo = `Here is a focused answer about: ${this.draft.trim()}`;
    this.messages.push({ from: 'ai', text: echo });
    this.draft = '';
  }
}
