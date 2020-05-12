import { FetchPendingOrdersService } from './../../../services/seller/fetch-pending-orders.service';
import { ChangeStatusService } from './../../../services/seller/change-status.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'item-view',
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss']
})
export class ItemViewComponent implements OnInit {
  @Input() order
  loading : boolean = true;
  constructor(
    private changeS : ChangeStatusService,
    private fetch: FetchPendingOrdersService
  ) { }

  ngOnInit() {
    console.log(this.order)
    this.loading = false
  }

  getName(prodId){
    let ans = this.order.productInfo.filter((prod)=> prod._id == prodId)
    return ans[0].name
  }

  getImage(prodId){
    let ans = this.order.productInfo.filter((prod)=> prod._id == prodId)
    return ans[0].images[0]
  }

  getPrice(prodId){
    let ans = this.order.productInfo.filter((prod)=> prod._id == prodId)
    return ans[0].price
  }

  orderPlaced(){
    this.loading = true
    this.changeS.changeStatus(this.order._id,"Order Placed")
    .subscribe((data)=>{
      this.fetch.loadOrders()
    })
  }
  orderPackaged(){
    this.loading = true
    this.changeS.changeStatus(this.order._id,"Packaged")
    .subscribe((data)=>{
      this.fetch.loadOrders()
    })
  }
  orderShipped(){
    this.loading = true
    this.changeS.changeStatus(this.order._id,"Shipping")
    .subscribe((data)=>{
      this.fetch.loadOrders()
    })
  }
  orderOutForDelivery(){
    this.loading = true
    this.changeS.changeStatus(this.order._id,"Out For Delivery")
    .subscribe((data)=>{
      this.fetch.loadOrders()
    })
  }
  orderCompleted(){
    this.loading = true
    this.changeS.changeStatus(this.order._id,"Completed")
    .subscribe((data)=>{
      this.fetch.loadOrders()
    })
  }

}
