import { FirebaseAuthService } from './../auth/firebase-auth.service';
import { UserInf } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { MongooseService } from './../auth/mongoose/mongoose.service';
import { NotificationService } from './../notification.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ProductInf } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  _cart: BehaviorSubject<ProductInf[]> 
  cart$: Observable<ProductInf[]>
  _productDetails: BehaviorSubject<ProductInf[]> 
  productDetails$: Observable<ProductInf[]>
  mUserData : UserInf
  fuser:any
  constructor(
    private noti: NotificationService,
    private mUser: MongooseService,
    private http: HttpClient,
    private fuserS: FirebaseAuthService
  ) {
    this._cart = new BehaviorSubject([])
    this.cart$ = this._cart.asObservable()


    this._productDetails = new BehaviorSubject([])
    this.productDetails$ = this._productDetails.asObservable()


    this.fuserS.user$.subscribe((user)=>{
      if(user){
        this.fuser = user
      }
    })

    this.mUser.muser$.subscribe((user)=>{
      if(user.name){
        this.mUserData = user
        this._cart.next(user.cart)
      }
    })
   }

  
  addToCart(product: ProductInf, quantity: number = 1){
    this.http.post(`${environment.apiUrl}/cart/addToCart`,{
      "mUserId":this.mUserData._id,
      "payload":{
        "productId":product._id,
        "quantity":quantity
      }
    })
    .subscribe((data:any)=>{
      if(data.status=="success"){
        this.loadProductDetailsOfItemsInCart()
        this.updateUserCart()
        this.noti.notify(`${product.name} was added to cart!`)
      }
    })
  }
  

  loadProductDetailsOfItemsInCart(){
    if(!this.mUserData){
      return;
    }
    console.log("Fetching product details")
    this.http.get(`${environment.apiUrl}/cart/${this.mUserData._id}`)
    .subscribe((res: any)=>{
      if(res.status=="success"){
        let products = res.data[0].productInfo
        let resultArray = []
        products.map((eachProd)=>{
          resultArray.push({
                "name":eachProd.name,
                "images": eachProd.images,
                "price": eachProd.price,
                "description": eachProd.description,
                "_id": eachProd._id
              })
        }
        )
        this._productDetails.next(resultArray)
      }
    })
  }

  modifyCart(cartId, quantity){
    // For editing existing items in the cart
    if(!this.mUserData._id)
      return
    const payload = {cartId, quantity}
    this.http.post(`${environment.apiUrl}/cart/editCart`,{
      "mUserId":this.mUserData._id,
      "payload": payload
    })
    .subscribe((data:any)=>{
      if(data.status=="success"){
        this.noti.notify("Cart was updated!")
        this.updateUserCart()
      }
    })
  }

  updateUserCart(){
    // Once the cart is modified, or an item is added, update the cart Service.
    console.log("Cart updated!")
    let fuser = this.fuser;
    this.http.get<UserInf>(`${environment.apiUrl}/user/firebase/${fuser.uid}`)
    .subscribe((user:any)=>{
      if(user.status=="success"){
        this._cart.next(user.data.cart)
      }
    })
  }
  
}
