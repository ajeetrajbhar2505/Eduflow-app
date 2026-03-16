import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'eduflow_session';
  private readonly currentUser$ = new BehaviorSubject<User | null>(this.loadPersistedUser());
  private storageAvailable = this.checkStorage();

  get user$(): Observable<User | null> {
    return this.currentUser$.asObservable();
  }

  get snapshot(): User | null {
    return this.currentUser$.value;
  }

  login(email: string, role: UserRole): Observable<User> {
    const user: User = {
      email,
      role,
      displayName: email.split('@')[0],
      token: crypto.randomUUID(),
    };

    return new Observable<User>((observer) => {
      this.persist(user);
      this.currentUser$.next(user);
      observer.next(user);
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.currentUser$.next(null);
  }

  hasRole(roles: UserRole | UserRole[]): boolean {
    const current = this.snapshot;
    if (!current) {
      return false;
    }
    return Array.isArray(roles) ? roles.includes(current.role) : current.role === roles;
  }

  private loadPersistedUser(): User | null {
    if (!this.checkStorage()) {
      return null;
    }
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as User) : null;
    } catch (error) {
      console.warn('Session restore failed', error);
      return null;
    }
  }

  private persist(user: User): void {
    if (!this.storageAvailable) {
      return;
    }
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(user));
    } catch (error) {
      console.warn('Persist skipped; storage unavailable', error);
      this.storageAvailable = false;
    }
  }

  private checkStorage(): boolean {
    try {
      const testKey = '__eduflow_test__';
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }
}
