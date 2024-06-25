import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private tokenService: TokenService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //return true;
    const token = localStorage.getItem('token');
    if (token && !this.tokenService.isTokenExpired(token)) {
      // Optionally, decode the token and perform further checks (e.g., roles)
      const decodedToken = this.tokenService.decodeToken(token);
      console.log('Decoded Token:', decodedToken);
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}