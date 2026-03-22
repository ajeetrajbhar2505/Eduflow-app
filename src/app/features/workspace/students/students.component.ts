import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
interface TabFlags {
  overView: boolean;
  chats: boolean;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports : [CommonModule,RouterModule]
})
export class StudentsComponent  implements OnInit {


   tabFlags: TabFlags = {
    overView: true,
    chats: false,
  };

  setActiveTab(tabName: keyof TabFlags) {
    this.tabFlags.overView = false;
    this.tabFlags.chats = false;

    this.tabFlags[tabName] = true;
  }

  constructor() { }

  ngOnInit() {}

}
