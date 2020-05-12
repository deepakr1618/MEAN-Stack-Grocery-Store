import { UserInf } from './../../models/user.model';
import { CartService } from './../../services/api/cart.service';
import { NotificationService } from './../../services/notification.service';
import { MongooseService } from './../../services/auth/mongoose/mongoose.service';
import { Component, OnInit } from '@angular/core';
import { mapTo, mergeMap } from 'rxjs/operators';
import { pipe, merge, forkJoin, combineLatest } from 'rxjs';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  loading: boolean = true
  notLoggedIn : boolean = false
  mUserData : UserInf
  productDetails: Array<any>
  cartItems: Array<any>
  total: number=0
  empty: boolean = false
  step: number = 0
  constructor(
    private mUser : MongooseService,
    private noti : NotificationService,
    private cartService : CartService
  ) {
    
    //combine two services, one to fetch cart, another to fetch the products detail
    let cartAndDetail = combineLatest(
      [
        this.cartService.cart$,
        this.cartService.productDetails$
      ]
    )
    cartAndDetail.subscribe((data)=>{
      this.total = 0
      const [cartItemsData , productDetailsData] = data
      if(cartItemsData.length>0 && productDetailsData.length>0){
          this.calculateTotal(cartItemsData , productDetailsData)
          this.cartItems = cartItemsData
          this.productDetails = productDetailsData
          this.loading = false
      }
      else if(cartItemsData.length==0 && this.mUserData){
        this.empty= true
        this.cartItems = []
      }
      this.loading = false
    })


    this.mUser.muser$.subscribe((user)=>{
      if(user._id){
        this.notLoggedIn = false
        this.mUserData = user
        this.cartService.loadProductDetailsOfItemsInCart()
      }else{
        console.log("No user")
        this.notLoggedIn = true
      }
    })

  }

  ngOnInit() {
  }

  calculateTotal(cartItemsData , productDetailsData){
    this.total = 0
    cartItemsData.map((cartItem)=>{
      let prodDet = productDetailsData.filter((product)=>product._id == cartItem.productId)[0]
      this.total += prodDet.price*cartItem.quantity
    })
  }

  moveToDetailInput(){
    this.step = 1
  }

}
