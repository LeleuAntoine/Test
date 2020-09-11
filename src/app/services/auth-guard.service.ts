import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {rejects} from 'assert';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(
      (resolve, rejects) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user){
              resolve(true);
            } else {
              this.router.navigate(['auth', 'signin']);
              resolve(false);
            }
          }
        );
      }
    );
  }
}
