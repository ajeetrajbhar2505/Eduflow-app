import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-loader-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-loader-screen.component.html',
  styleUrls: [],
})
export class AppLoaderScreenComponent implements AfterViewInit {
  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.router.navigateByUrl('/onboarding/hero'), 1200);
  }
}
