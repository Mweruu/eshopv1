import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, UrlTree, Router, RouterStateSnapshot } from '@angular/router';
import { LocalstorageService } from './localstorage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router:Router,
              private localStorage:LocalstorageService) { }
// export declare interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    const token = this.localStorage.getToken();

    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode.isAdmin && !this._tokenExpired(tokenDecode.exp)){
        return true
      }
    }
    // this.router.navigate(['/products'])
    this.router.navigate(['/login'])
    return false

  }

  private _tokenExpired(expiration: number):boolean{
    return Math.floor(new Date().getTime()/1000) >= expiration
  }
}
