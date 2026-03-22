import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-exam-instructions',
  templateUrl: './exam-instructions.component.html',
  styleUrls: ['./exam-instructions.component.scss'],
  imports: [RouterModule]
})
export class ExamInstructionsComponent implements OnInit {


  isConfirmed = signal<boolean>(true);
  

  // Method to toggle the checkbox
  toggleConfirmation(): void {
    this.isConfirmed.update(value => !value);
  }

  constructor() { }

  ngOnInit() { }

}
