import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-examination-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-examination-3.component.html',
  styleUrls: [],
})
export class LiveExamination3Component implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const back = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /back|return|close/i.test(el.textContent || ''),
    );
    back?.addEventListener('click', () => this.router.navigateByUrl('/workspace/exam/live'));
  }
}
