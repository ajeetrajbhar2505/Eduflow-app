import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class OnboardingFlowService {
  private readonly email$ = new BehaviorSubject<string | null>(null);
  private readonly otpCode = '246810';
  private biometricAllowed = false;
  private role: UserRole = 'student';

  setEmail(email: string): void {
    this.email$.next(email);
  }

  setRole(role: UserRole): void {
    this.role = role;
  }

  enableBiometric(): void {
    this.biometricAllowed = true;
  }

  get email(): string | null {
    return this.email$.value;
  }

  get otp(): string {
    return this.otpCode;
  }

  get userRole(): UserRole {
    return this.role;
  }

  canUseBiometric(): boolean {
    return this.biometricAllowed;
  }

  validateOtp(code: string): boolean {
    return code.replace(/\s/g, '') === this.otpCode;
  }
}
