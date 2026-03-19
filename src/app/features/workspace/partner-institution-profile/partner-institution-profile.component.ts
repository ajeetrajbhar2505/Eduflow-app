import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface TabFlags {
  activeExams: boolean;
  achievements: boolean;
  reviews: boolean;
}

@Component({
  selector: 'app-partner-institution-profile',
  templateUrl: './partner-institution-profile.component.html',
  styleUrls: ['./partner-institution-profile.component.scss'],
  imports: [RouterModule,CommonModule]
})
export class PartnerInstitutionProfileComponent {

  tabFlags: TabFlags = {
    activeExams: true,
    achievements: false,
    reviews: false
  };

  setActiveTab(tabName: keyof TabFlags) {
    this.tabFlags.activeExams = false;
    this.tabFlags.achievements = false;
    this.tabFlags.reviews = false;

    this.tabFlags[tabName] = true;
  }



}
