import { CartService } from './../../../services/api/cart.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'checkout-item',
  templateUrl: './checkout-item.component.html',
  styleUrls: ['./checkout-item.component.scss']
})
export class CheckoutItemComponent implements OnInit {
  @Input("cartItemToDisplay") cartItem;
  @Input("allProductDetails") productDetails;
  description: string
  name: string
  images: Array<any>
  price: number
  quantity: number
  constructor(
    private cartService : CartService
  ) { 
  }

  ngOnInit() {
    console.log("An item card updated!")
    let prodDet = this.productDetails.filter((prod)=>prod._id==this.cartItem.productId)[0]
    this.description = prodDet.description
    this.name = prodDet.name
    this.images = prodDet.images
    this.price = prodDet.price
    this.quantity = this.cartItem.quantity
  }

  removeAProduct(){
    this.cartService.modifyCart(this.cartItem._id, this.quantity-1)
  }

  addAProduct(){
    this.cartService.modifyCart(this.cartItem._id, this.quantity+1)
  }

  deleteProduct(){
    this.cartService.modifyCart(this.cartItem._id, 0)
  }

}
