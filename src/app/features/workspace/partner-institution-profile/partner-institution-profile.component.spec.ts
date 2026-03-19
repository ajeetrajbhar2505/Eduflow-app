import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PartnerInstitutionProfileComponent } from './partner-institution-profile.component';

describe('PartnerInstitutionProfileComponent', () => {
  let component: PartnerInstitutionProfileComponent;
  let fixture: ComponentFixture<PartnerInstitutionProfileComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerInstitutionProfileComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PartnerInstitutionProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
