import { FetchService } from './../../services/api/fetch.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductInf } from 'src/app/models/product.model';

@Component({
  selector: 'view-type',
  templateUrl: './view-type.component.html',
  styleUrls: ['./view-type.component.scss']
})
export class ViewTypeComponent implements OnInit {
  private type: string
  private count: number = 0
  private products: Array<ProductInf>
  private title: String = "A bottle of coke(1Ltr) Buy 1 Get 1 Free"
  private url: String = "assets/beverages.png"
  private price: number = 1255

  constructor(
    private aroute : ActivatedRoute,
    private router: Router,
    private fetchService : FetchService
  ) { }

  ngOnInit() {
    this.type = this.aroute.snapshot.paramMap.get("id")
    console.log(this.type)
    switch(this.type){
      case 'vegetables':
        this.getType(this.type.toUpperCase())
        break
      case 'staples':
        this.getType(this.type.toUpperCase())
        break
      case 'dairy':
        this.getType(this.type.toUpperCase())
        break
      case 'snacks':
        this.getType(this.type.toUpperCase())
        break
      default:
        this.router.navigate(["/404"])
    }
  }

  getType(type="DAIRY"){
    this.fetchService.getType(this.type.toUpperCase()).subscribe((data)=>{
      this.count = data.length
      this.products = data
      console.log("Data loaded")
    })
  }

}
