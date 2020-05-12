import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss']
})
export class CustomButtonComponent implements OnInit {
  @Input() str: string=""
  @Input() func: Function = ()=>{console.log("Nothing assigned")}
  constructor() { }

  ngOnInit() {
  }

}
