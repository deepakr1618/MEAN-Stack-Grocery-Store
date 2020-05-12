import { FirebaseAuthService } from './../../services/auth/firebase-auth.service';
import { MongooseService } from './../../services/auth/mongoose/mongoose.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userEmail: string = "No Firebase Email Found!"
  constructor(
    private mUser : MongooseService,
    private fUser : FirebaseAuthService
  ) { }

  ngOnInit() {
    this.fUser.user$.subscribe((user)=>{
      this.userEmail = user.email
    })
  }

  formSubmit(name,dr,street,pincode,city){
    this.mUser.mongooseCreateUser(name, dr,street, city, pincode)
  }

}
