import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


import { AuthService } from '../shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _currentUserService: AuthService, private _router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (!this._currentUserService.accessToken) {
        this._router.navigate(['/login']);
        return false;
      } else {
        return true;
      }
  }
}
