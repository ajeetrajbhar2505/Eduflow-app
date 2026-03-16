import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-shell-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, IonicModule],
  template: `
    <div class="min-h-screen">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class ShellLayoutComponent {}
