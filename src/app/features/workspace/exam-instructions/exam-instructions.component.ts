import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-instructions',
  templateUrl: './exam-instructions.component.html',
  styleUrls: ['./exam-instructions.component.scss'],
  imports:[RouterModule]
})
export class ExamInstructionsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
