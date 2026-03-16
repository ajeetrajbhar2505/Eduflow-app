import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review-success-celebration-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-success-celebration-screen.component.html',
  styleUrls: [],
})
export class ReviewSuccessCelebrationScreenComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const history = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /history|view/i.test(el.textContent || ''),
    );
    history?.addEventListener('click', () => this.router.navigateByUrl('/workspace/analytics/history'));
  }
}
