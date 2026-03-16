import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss'],
  imports: [RouterModule],
  standalone: true,
})
export class OtpVerificationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
