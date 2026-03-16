import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class LandingPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
