import { NotificationService } from './../notification.service';
import { environment } from './../../../environments/environment';
import { OrderInf } from './../../models/order.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { MongooseService } from './../auth/mongoose/mongoose.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchPendingOrdersService {
  sellerOrder_ : BehaviorSubject<OrderInf[]>;
  sellerOrder$ :  Observable<OrderInf[]>
  constructor(
    private http: HttpClient,
    private mUser: MongooseService,
    private noti: NotificationService
  ) {
    this.sellerOrder_ = new BehaviorSubject([])
    this.sellerOrder$ = this.sellerOrder_.asObservable()
    this.loadOrders()
  }

  loadOrders(){
    this.http.get(`${environment.apiUrl}/seller`)
    .subscribe((response: any)=>{
      if(response.status != "success"){
          this.noti.warning("Something went wrong!")
      }
      else{
        this.sellerOrder_.next(response.data)
      }
    })
  }
}
