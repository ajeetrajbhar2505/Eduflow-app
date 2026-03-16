import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ai-exam-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
  template: `
    <section class="space-y-4">
      <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Screen 144 · AI exam generator</p>
      <h1 class="text-3xl font-bold">Generate exam with AI</h1>
      <form class="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-200">
        <label class="flex flex-col gap-2">
          <span>Prompt</span>
          <textarea [(ngModel)]="prompt" name="prompt" rows="4" class="rounded-xl border border-white/10 bg-white/5 px-4 py-3" placeholder="Generate 10 MCQs on probability with answers"></textarea>
        </label>
        <label class="flex flex-col gap-2">
          <span>Upload blueprint (Excel)</span>
          <input type="file" class="rounded-xl border border-dashed border-white/20 bg-white/5 px-4 py-3" />
        </label>
        <button type="button" class="rounded-full bg-primary px-5 py-3 font-semibold text-white shadow-glow-blue">Generate</button>
      </form>
    </section>
  `,
})
export class AiExamGeneratorComponent {
  prompt = '';
}
