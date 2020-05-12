import { NotificationService } from './../../services/notification.service';
import { MongooseService } from './../../services/auth/mongoose/mongoose.service';
import { FirebaseUser } from './../../models/firebaseUser';
import { FirebaseAuthService } from './../../services/auth/firebase-auth.service';
import { CartService } from './../../services/api/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cart: Array<any>=[]
  fuserData: any
  muserData: any
  displayName:string=""
  constructor(
    private _cartService: CartService,
    private firebaseauth: FirebaseAuthService,
    private muser: MongooseService,
    private noti: NotificationService
  ) { }

  ngOnInit() {

    //Get Cart Service
    this._cartService.cart$.subscribe((data)=>{
      this.cart = data
    })

    //Get User Service from firebase
    this.firebaseauth.user$.subscribe((data)=>{
      if(data){
        this.fuserData = data
      }else{
        this.cart = []
      }
    })

    //Get mongoose data
    this.muser.muser$.subscribe((data)=>{
      this.muserData=data
      this.displayName = data.name
    })
  }

  login(){
    //If a user already exists, sign out of firebase which will also update the mongoose user
    if(this.muserData.name){
      this.firebaseauth.signOut()
      .then(()=>{
        this.noti.notify("Logged Out!")
      })
      .catch((e)=>{
        console.log(e)
      })
    }else{
      this.firebaseauth.signInWithGoogle()
      .then((res)=>{
        this.displayName = "Log In"
      })
    .catch(err=>console.log(err))
    }
  }


}
