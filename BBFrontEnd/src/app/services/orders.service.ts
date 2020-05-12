import { CartService } from './api/cart.service';
import { UserInf } from './../models/user.model';
import { Router } from '@angular/router';
import { NotificationService } from './notification.service';
import { MongooseService } from './auth/mongoose/mongoose.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { OrderInf } from './../models/order.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  user: UserInf = undefined
  cartData : Array<any>= []


  constructor(
    private http: HttpClient,
    private mUser : MongooseService,
    private noti : NotificationService,
    private router: Router,
    private cart : CartService
  ) { 
    this.mUser.muser$.subscribe((user)=>{
      this.user = user
    })

    this.cart.cart$.subscribe((cartD)=>{
      this.cartData = cartD
    })
  }

  
  makeOrder(address, total){
    if(!this.user.email){
      this.noti.warning("No user found, please re login!")
      return
    }
      this.http.post(`${environment.apiUrl}/order/makeOrder`,{
        buyer : this.user._id,
        total,
        cart: this.cartData,
        address
      })
      .subscribe((data:any)=>{
        if(data.status=="success"){
          this.noti.notify("Order successfully placed!")
          this.mUser.updateMongooseUser()
          this.router.navigate(["/orders"])
        }
        else
          this.noti.warning("Something went wrong!")
      })
  }

  loadOrder(id){
    if(!this.user.email){
      this.noti.warning("No user found, please re login!")
      of(0)
    }
    return this.http.get(`${environment.apiUrl}/order/${id}`)
  }
}
