import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  private isLogin: boolean;

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    const url = state.url;

    const flag: any = sessionStorage.getItem('login');
    if (flag !== null && flag !== undefined && flag !== '') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      this.router.navigate(['/portal/login']);
    }

    return this.isLogin;
  }

}
