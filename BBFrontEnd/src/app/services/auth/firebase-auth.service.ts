import { NotificationService } from './../notification.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router'

import { auth } from "firebase/app"
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable, interval } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAuthService {
  user$: Observable<firebase.User>;

  windowRef: any;
  verificationCode: string;
  user: any;


  constructor(
    private _firebaseAuth: AngularFireAuth,
    private ns: NotificationService
    
    ) {
    this.user$ = _firebaseAuth.authState;
    // this.user$.subscribe((user)=>{
    //   if(user){
    //       this.ns.notify(`Welcome ${user.displayName} !`)
    //   }
    // })
   }

  
  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  signInWithPhone() {
  }

  signOut(){
    return this._firebaseAuth.auth.signOut()
  }
}
