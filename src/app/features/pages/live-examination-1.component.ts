import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-live-examination-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './live-examination-1.component.html',
  styleUrls: [],
})
export class LiveExamination1Component implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const grid = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /grid|overview|questions/i.test(el.textContent || ''),
    );
    grid?.addEventListener('click', () => this.router.navigateByUrl('/workspace/exam/grid'));

    const proctor = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /proctor|camera|video/i.test(el.textContent || ''),
    );
    proctor?.addEventListener('click', () => this.router.navigateByUrl('/workspace/exam/proctor'));
  }
}
