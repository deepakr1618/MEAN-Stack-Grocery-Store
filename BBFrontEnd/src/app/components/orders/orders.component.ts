import { NotificationService } from './../../services/notification.service';
import { UserInf } from './../../models/user.model';
import { MongooseService } from './../../services/auth/mongoose/mongoose.service';
import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  mUserData: UserInf = undefined
  loaded: boolean = false
  constructor(
    private mUser: MongooseService,
    private noti : NotificationService
  ) { 
  }

  ngOnInit() {
    this.loadOrders()
  }

  loadOrders(){
    this.mUser.muser$.subscribe((user)=>{
      if(user.email){
        this.mUserData = user
        this.loaded=true
      }
      else{
        this.noti.warning("No user found, please re login!")
      }
  })
  }

}
