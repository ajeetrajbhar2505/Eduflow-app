import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testimonial-slider-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonial-slider-landing-page.component.html',
  styleUrls: [],
})
export class TestimonialSliderLandingPageComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const cta = document.querySelector('button, a');
    cta?.addEventListener('click', () => this.router.navigateByUrl('/onboarding/login'));
  }
}
