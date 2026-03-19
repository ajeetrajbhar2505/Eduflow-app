import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-question-overview',
  templateUrl: './question-overview.component.html',
  styleUrls: ['./question-overview.component.scss'],
  imports : [RouterModule]
})
export class QuestionOverviewComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
