import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './../notification.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangeStatusService {

  constructor(
    private noti: NotificationService,
    private http: HttpClient
  ) { }

  changeStatus(orderId, status){
    return this.http.post(`${environment.apiUrl}/seller/change`,{
      orderId,
      status
    })
  }
}
