import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-otp-verification-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp-verification-screen.component.html',
  styleUrls: [],
})
export class OtpVerificationScreenComponent implements AfterViewInit {
  constructor(private readonly router: Router, private readonly auth: AuthService) {}

  ngAfterViewInit(): void {
    const verify = Array.from(document.querySelectorAll('button, a')).find((el) =>
      /verify|continue|start/i.test(el.textContent || ''),
    );
    verify?.addEventListener('click', () => {
      this.auth.login('student@demo.edu', 'student').subscribe(() => {
        this.router.navigateByUrl('/workspace/student-hub/dashboard');
      });
    });
  }
}
