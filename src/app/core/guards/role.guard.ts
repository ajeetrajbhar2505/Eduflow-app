import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles = route.data['roles'] as UserRole[] | undefined;
    if (!roles || roles.length === 0) {
      return true;
    }

    if (this.auth.hasRole(roles)) {
      return true;
    }

    this.router.navigateByUrl('/onboarding', { state: { redirectUrl: state.url, reason: 'unauthorized' } });
    return false;
  }
}
