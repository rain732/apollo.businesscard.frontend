import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServices } from './auth.services';

@Injectable({
  providedIn: 'root',
})
export class RolesGuard implements CanActivate {
  constructor(private authServices: AuthServices, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let canActivate: boolean = false;
    const userRoles = this.getUserRole();
   const isArray =  Array.isArray(userRoles)
   if(isArray)
    canActivate = userRoles.some(x => route.data['roles'].includes(x) )
  else
   canActivate = route.data['roles'].includes(userRoles);

    if (canActivate) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }

  getUserRole() {
    return this.authServices.getUserRoles();
  }
}
