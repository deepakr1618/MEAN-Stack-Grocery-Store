import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications$:Observable<any>
  
  constructor(
    private notification: NotificationService
  ) { }

  ngOnInit() {
    this.notifications$ = this.notification.notifications$
  }

}
