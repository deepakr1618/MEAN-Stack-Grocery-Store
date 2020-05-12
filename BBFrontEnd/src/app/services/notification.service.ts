import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import { map, delay, filter } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  _notifications: BehaviorSubject<Array<any>> = new BehaviorSubject([])
  notifications$: Observable<Array<any>>

  
  constructor() {
      this.notifications$ = this._notifications.asObservable()
  }
  
  notify(str = "Default Notification"){
    let newArr = this._notifications.value
    let randomId:number = Math.random()*100
    newArr.push({
      id:randomId,
      text:str
    })
    this._notifications.next(newArr);
    (()=>{
      setTimeout(()=>{
        let newArr = this._notifications.value.filter((s)=>s.id!=randomId)
        this._notifications.next(newArr);
      },3000)
    })()
  }

  warning(str="Something went wrong"){
    let newArr = this._notifications.value
    let randomId:number = Math.random()*100
    newArr.push({
      id:randomId,
      text:str
    })
    this._notifications.next(newArr);
    (()=>{
      setTimeout(()=>{
        let newArr = this._notifications.value.filter((s)=>s.id!=randomId)
        this._notifications.next(newArr);
      },3000)
    })()
  }

}
