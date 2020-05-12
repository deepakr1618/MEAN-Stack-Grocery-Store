import { OrdersService } from './../../../services/orders.service';
import { MongooseService } from './../../../services/auth/mongoose/mongoose.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'get-details',
  templateUrl: './get-details.component.html',
  styleUrls: ['./get-details.component.scss']
})
export class GetDetailsComponent implements OnInit {
  userEmail :string = "No Data Found"
  userName :string = "No Data Found"
  userDoorNumber :number = 0
  userStreet :string = "No Data Found"
  userPinCode :number = 0
  userCity :string = "No Data Found"
  allowProceed: boolean = false

  @Input('userTotal') total;
  constructor(
    private mUser:MongooseService,
    private order: OrdersService
  ) {
  }

  ngOnInit() {
    this.mUser.muser$.subscribe((data)=>{
      this.userCity = data.address.city
      this.userDoorNumber = data.address.houseNo
      this.userEmail = data.email
      this.userName = data.name
      this.userPinCode = data.address.pincode
      this.userStreet = data.address.street
      this.allowProceed = true
    })
  }

  submitOrder(dr,street,pincode,city){
    const address = {
      dr,
      street,
      pincode,
      city
    }
    this.order.makeOrder(address,this.total)
  }

}
