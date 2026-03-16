import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-instructions-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-instructions-1.component.html',
  styleUrls: [],
})
export class ExamInstructions1Component implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const start = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /start|begin|launch/i.test(el.textContent || ''),
    );
    start?.addEventListener('click', () => this.router.navigateByUrl('/workspace/exam/live'));
  }
}
