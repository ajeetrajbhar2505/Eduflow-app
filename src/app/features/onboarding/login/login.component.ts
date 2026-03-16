import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule],
  standalone: true,
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
