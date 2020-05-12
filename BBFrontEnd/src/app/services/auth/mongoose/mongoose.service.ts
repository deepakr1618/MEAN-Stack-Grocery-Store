import { NotificationService } from './../../notification.service';
import { FirebaseAuthService } from './../firebase-auth.service';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserInf } from './../../../models/user.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'firebase';
import { stringify } from 'querystring';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class MongooseService {
  muser_ : BehaviorSubject<UserInf> = new BehaviorSubject({
    firebaseUID: undefined,
    _id:undefined,
    name: undefined,
    cart: [],
    address:{
        houseNo:undefined,
        street: undefined,
        city: undefined,
        pincode: undefined
    },
    email:undefined
  })
  muser$: Observable<UserInf>
  fuser:any
  constructor(
    private http: HttpClient,
    private firebaseAuth : FirebaseAuthService,
    private noti: NotificationService,
    private router: Router
  ) {
    this.muser$ = this.muser_.asObservable()
    this.firebaseAuth.user$.subscribe((user)=>{
      console.log("Mongoose found change in firebase auth!")
      if(user){
        this.fuser = user
        this.updateMongooseUser()
      }else{
        //Logged out
        this.muser_.next({
          _id:undefined,
          firebaseUID: undefined,
          name: undefined,
          cart: [],
          address:{
              houseNo:undefined,
              street: undefined,
              city: undefined,
              pincode: undefined
          },
          email:undefined
        })
      }
    })
  }

  updateMongooseUser(){
    let fuser = this.fuser;
    this.http.get<UserInf>(`${environment.apiUrl}/user/firebase/${fuser.uid}`)
    .subscribe((user:any)=>{
      if(user.status=="success"){
        this.noti.notify(`Welcome ${user.data.name}!`)
        this.muser_.next(user.data)
      }else if(user.status=="NEW_USER"){
        console.log("New user")
        this.router.navigate(["/signup"])
      }
    })
  }


  mongooseCreateUser(name, dr,street, city, pincode){
    let fuser = this.fuser;
    this.http.post<UserInf>(`${environment.apiUrl}/user/`,{
      name,
      address: {
        street,
        city,
        pincode,
        houseNo: dr
      },
      firebaseUID: fuser.uid,
      email: fuser.email
    })
    .subscribe((user:any)=>{
      if(user.status=="success"){
        this.noti.notify(`Welcome ${user.data.name}!`)
        this.muser_.next(user.data)
        this.router.navigate(["/"])
      }else{
        this.noti.warning("Failure!")
      }
    })
  }

  

}
