import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reset-password-screen.component.html',
  styleUrls: [],
})
export class ResetPasswordScreenComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const back = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /back|login/i.test(el.textContent || ''),
    );
    back?.addEventListener('click', () => this.router.navigateByUrl('/onboarding/login'));
  }
}
