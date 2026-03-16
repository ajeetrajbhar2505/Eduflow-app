import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialLoginGoogleComponent } from './social-login-google.component';

describe('SocialLoginGoogleComponent', () => {
  let component: SocialLoginGoogleComponent;
  let fixture: ComponentFixture<SocialLoginGoogleComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginGoogleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
