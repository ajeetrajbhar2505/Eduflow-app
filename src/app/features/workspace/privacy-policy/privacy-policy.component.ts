import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss'],
  imports : [RouterModule]
})
export class PrivacyPolicyComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
