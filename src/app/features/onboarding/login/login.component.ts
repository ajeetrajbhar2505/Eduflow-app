import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SocialLoginFacebookComponent } from "../social-login-facebook/social-login-facebook.component";
import { SocialLoginFingureprintComponent } from "../social-login-fingureprint/social-login-fingureprint.component";
import { SocialLoginGoogleComponent } from "../social-login-google/social-login-google.component";
import { OtpVerificationComponent } from "../otp-verification/otp-verification.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [RouterModule, SocialLoginFacebookComponent, SocialLoginFingureprintComponent, SocialLoginGoogleComponent, OtpVerificationComponent],
  standalone: true,
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
