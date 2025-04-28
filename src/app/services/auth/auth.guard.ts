import { Inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthServices } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  localStorage: any;
  private isLocalStorageAvailable = typeof localStorage !== 'undefined';

  constructor(private authServices: AuthServices, private router: Router) {
    //this.localStorage = document.defaultView?.localStorage;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    return this.checkAuth();
  }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    if (this.isLocalStorageAvailable) {
      if (!this.authServices.checkIfTokenValid()) {
        this.authServices.clearTokens();
        this.router.navigate(['/auth']);
      }

      const token = this.authServices.getAccessToken();
      if (token) {
        this.authServices.changeAuthStatus(true);
      }

      let isAuthenticated = this.authServices.getAuthStatus();
      if (!isAuthenticated) {
        this.authServices.clearTokens();
        this.router.navigate(['/auth']);
        return false;
      }

      return isAuthenticated;
    } else {
      // Handle the case where localStorage is not available
      // You might want to redirect to a different route or handle it differently
      console.error('localStorage is not available in this environment.');
      return false;
    }
  }

  private checkAuth(): boolean | Promise<boolean> {
    if (!this.isLocalStorageAvailable) {
      console.error('localStorage is not available in this environment.');
      return false;
    }

    if (!this.authServices.checkIfTokenValid()) {
       this.authServices.clearTokens();
      this.router.navigate([
        '/auth',
      ]);
      return false;
    }

    const token = this.authServices.getAccessToken()
    if (token) {
      this.authServices.changeAuthStatus(true);
    }

    let isAuthenticated = this.authServices.getAuthStatus();
    if (!isAuthenticated) {
      this.authServices.clearTokens();
      this.router.navigate([
        '/auth',
      ]);
      return false;
    }

    return true;
  }
}
