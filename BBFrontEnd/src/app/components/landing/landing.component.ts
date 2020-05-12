import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(
    private ns : NotificationService
  ) { }

  ngOnInit() {
  }

  notify(){
    this.ns.notify("Nothing to know more!")
  }

}
