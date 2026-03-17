import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  imports : [RouterModule]
})
export class ExamsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
