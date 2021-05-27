import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SpaceServiceService } from '../space-service.service';

@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {
  provSer: SpaceServiceService;
  
  constructor(private AFauth: AngularFireAuth, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.AFauth.authState.pipe(map( auth =>{

        if (auth == null) {
          return true;
        }else{
          this.router.navigate(['/lanzamientos'])
          return false;
        }
      }))
  }
  
}
