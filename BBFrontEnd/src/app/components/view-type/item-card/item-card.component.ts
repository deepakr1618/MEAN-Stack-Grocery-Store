import { CartService } from './../../../services/api/cart.service';
import { ProductInf } from './../../../models/product.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
  @Input('title') itemTitle:string;
  @Input('url') imageURL:string;
  @Input('price') price:number;
  @Input('product') product: ProductInf
  loading: boolean = false
  constructor(
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  addToCart(){
    this.cartService.addToCart(this.product)
  }

}
