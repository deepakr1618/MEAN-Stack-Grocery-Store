import { WindowService } from './services/window.service';
import { MongooseService } from './services/auth/mongoose/mongoose.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bigbasket';
  smallScreen = false
  constructor(
    private mUser : MongooseService,
    private windowService: WindowService
  ){
    
  }
  ngOnInit(){
    const width= this.windowService.windowRef.innerWidth;
    if(width<1000){
      this.smallScreen = true
    }
  }
}
