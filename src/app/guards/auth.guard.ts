import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpaceServiceService } from '../space-service.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  provSer: SpaceServiceService;

  constructor(private AFauth: AngularFireAuth, private router: Router,public spaceServiceService: SpaceServiceService) { 
    this.provSer = spaceServiceService;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      return this.AFauth.authState.pipe(map( auth =>{
        if (auth == null) {
          this.router.navigate(['/login'])
          return false;
        }else{
          this.provSer.setUser(auth.email)
          return true;
        }
      }))
      

  }

}
