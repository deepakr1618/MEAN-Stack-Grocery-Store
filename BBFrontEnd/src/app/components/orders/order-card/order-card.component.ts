import { CartService } from './../../../services/api/cart.service';
import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.scss']
})
export class OrderCardComponent implements OnInit {
  @Input() order;
  products: Array<any> = []
  total: number = 0
  orderItems = []
  status = "Loading..."
  loading = true
  completed = false
  constructor(
    private orderService : OrdersService,
    private noti : NotificationService,
    private cart : CartService
  ) {
    
   }

  ngOnInit() {
    this.orderService.loadOrder(this.order.orderId)
    .subscribe((data:any)=>{
      this.orderItems = []
      if(data.status!="success"){
        this.noti.warning("Something went wrong!")
        return;
      }
      data = data.data[0]
      console.log(data.cart)
      this.products = data.productInfo
      this.status = data.orderStatus
      this.completed = data.orderStatus == "Completed" ? true : false
      this.total = data.total
      this.orderItems = []
      data.cart.map((cartItem: any)=>{
        const prodId = cartItem.productId
        //The DS the items follow
        let orderDS = {
          quantity: cartItem.quantity,
          item : this.getProduct(prodId)
        }
        this.orderItems.push(orderDS)
      })
      this.loading = false
    })
  }
  
  getProduct(prodId){
    const item = this.products.filter((prod)=>prod._id == prodId)
    return item[0]
  }
}
