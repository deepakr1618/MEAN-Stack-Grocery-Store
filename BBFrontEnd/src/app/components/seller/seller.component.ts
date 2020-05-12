import { UserInf } from './../../models/user.model';
import { MongooseService } from './../../services/auth/mongoose/mongoose.service';
import { OrderInf } from './../../models/order.model';
import { FetchPendingOrdersService } from './../../services/seller/fetch-pending-orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {
  orders: OrderInf[]
  original: OrderInf[]
  loaded: boolean = false
  mUserData: UserInf
  hiddenCompletedOrders:boolean = false
  constructor(
    private fetchOrders: FetchPendingOrdersService,
    private mUser: MongooseService
  ) { }

  ngOnInit() {
    this.mUser.muser$.subscribe((user)=>{
      this.mUserData = user
    })
    this.fetchOrders.sellerOrder$.subscribe((data)=>{
      this.original = data
      this.orders = this.original
      this.loaded = true
    })
  }

  hideCompleted(){
    if(this.hiddenCompletedOrders){
      this.orders = this.original
      this.hiddenCompletedOrders = false
    }
    else{
      this.orders = this.orders.filter((order:any)=>order.orderStatus != "Completed")
      this.hiddenCompletedOrders = true
    }
  }

}
