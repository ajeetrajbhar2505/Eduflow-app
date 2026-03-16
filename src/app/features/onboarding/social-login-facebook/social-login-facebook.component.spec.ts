import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SocialLoginFacebookComponent } from './social-login-facebook.component';

describe('SocialLoginFacebookComponent', () => {
  let component: SocialLoginFacebookComponent;
  let fixture: ComponentFixture<SocialLoginFacebookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SocialLoginFacebookComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SocialLoginFacebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
