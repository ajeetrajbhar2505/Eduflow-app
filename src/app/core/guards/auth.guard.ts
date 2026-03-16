import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.verify(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    const url = '/' + segments.map((s) => s.path).join('/');
    return this.verify(url);
  }

  private verify(redirectUrl: string): boolean {
    if (this.auth.snapshot) {
      return true;
    }

    this.router.navigateByUrl('/onboarding', { state: { redirectUrl } });
    return false;
  }
}
