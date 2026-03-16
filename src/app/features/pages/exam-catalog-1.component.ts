import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam-catalog-1',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './exam-catalog-1.component.html',
  styleUrls: [],
})
export class ExamCatalog1Component implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    const starts = Array.from(document.querySelectorAll('button, a')).filter((el) =>
      /start|attempt|begin/i.test(el.textContent || ''),
    );
    starts.forEach((el) => el.addEventListener('click', () => this.router.navigateByUrl('/workspace/exam/instructions')));
  }
}
