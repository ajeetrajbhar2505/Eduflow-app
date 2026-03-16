import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialLoginFingureprintComponent } from './social-login-fingureprint.component';

describe('SocialLoginFingureprintComponent', () => {
  let component: SocialLoginFingureprintComponent;
  let fixture: ComponentFixture<SocialLoginFingureprintComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginFingureprintComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLoginFingureprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
