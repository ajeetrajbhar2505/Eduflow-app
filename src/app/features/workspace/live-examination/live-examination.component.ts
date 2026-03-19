import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-live-examination',
  templateUrl: './live-examination.component.html',
  styleUrls: ['./live-examination.component.scss'],
  imports : [RouterModule]
})
export class LiveExaminationComponent  implements OnInit {

  isImageBased = signal(false)
  toggleQuestion(){
    this.isImageBased.update(v=> !v);
  }
  constructor() { }

  ngOnInit() {}

}
