import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


import { UserInf } from './../../models/user.model';
import { ProductInf } from './../../models/product.model';
import { reduce, map, filter } from 'rxjs/operators'

import { environment } from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class FetchService {
  apiEndPoint: string= environment.apiUrl;
  products$:Observable<{
    "success":string,
    "data":ProductInf[]
  }> ;
  constructor( private http:HttpClient) { 
    this.products$ =  this.http.get<{
      "success":string,
      "data":ProductInf[]
    }>(`${this.apiEndPoint}/products`)
  }

  getType(type="DAIRY"){
    const res = this.products$.pipe(
      map(data=>data.data),
      map((array:ProductInf[])=>{
        let ans = array.filter((data:ProductInf)=>data.type==type)
        return ans
      })
    )
    return res;
  }
  
}

