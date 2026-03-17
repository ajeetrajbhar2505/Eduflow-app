import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
  imports : [RouterModule]
})
export class HistoryComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
