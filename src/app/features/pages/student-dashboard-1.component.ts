import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-dashboard-1.component.html',
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }
      .page-scroll {
        min-height: 100vh;
        overflow-y: auto;
      }
    `,
  ],
})
export class StudentDashboard1Component implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const browse = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /catalog|exam|start/i.test(el.textContent || ''),
    );
    browse?.addEventListener('click', () => this.router.navigateByUrl('/workspace/student-hub/catalog'));

    const tabMap: { pattern: RegExp; route: string }[] = [
      { pattern: /overview|home/i, route: '/workspace/student-hub/dashboard' },
      { pattern: /practice|exams|catalog/i, route: '/workspace/student-hub/catalog' },
      { pattern: /progress|results|analytics/i, route: '/workspace/analytics/results' },
      { pattern: /challenge|battle|rank/i, route: '/workspace/challenges/hub' },
    ];

    const tabs = Array.from(document.querySelectorAll('button, a'));
    tabs.forEach((el) => {
      const text = el.textContent || '';
      const match = tabMap.find((t) => t.pattern.test(text));
      if (match) {
        el.addEventListener('click', (ev) => {
          ev.preventDefault();
          this.router.navigateByUrl(match.route);
        });
      }
    });
  }
}
