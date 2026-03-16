import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modern-login-screen-with-socials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modern-login-screen-with-socials.component.html',
  styleUrls: [],
})
export class ModernLoginScreenWithSocialsComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const primary = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /login|continue|sign in|otp/i.test(el.textContent || ''),
    );
    primary?.addEventListener('click', () => this.router.navigateByUrl('/onboarding/otp'));

    const social = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /google|social/i.test(el.textContent || ''),
    );
    social?.addEventListener('click', () => this.router.navigateByUrl('/onboarding/social-loading'));
  }
}
