import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-onboarding-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-slate-900 text-white flex items-center justify-center p-8 text-center">
      <div class="space-y-4">
        <p class="text-xs uppercase tracking-[0.3em] text-slate-400">Placeholder</p>
        <h1 class="text-3xl font-bold">{{ title }}</h1>
        <p class="text-slate-300">Replace this component with your Stitch HTML for this screen.</p>
      </div>
    </div>
  `,
})
export class OnboardingPlaceholderComponent {
  @Input() title = 'Onboarding screen';
  constructor(private readonly route: ActivatedRoute) {
    const dataTitle = this.route.snapshot.data['title'];
    if (dataTitle) {
      this.title = dataTitle;
    }
  }
}
