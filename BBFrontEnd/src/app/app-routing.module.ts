import { SellerComponent } from './components/seller/seller.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SignupComponent } from './components/signup/signup.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ViewTypeComponent } from './components/view-type/view-type.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component:LandingComponent,
    pathMatch:"full"
  },
  {
    path:"type/:id",
    component:ViewTypeComponent
  },
  {
    path:"checkout",
    component:CheckoutComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"orders",
    component:OrdersComponent
  },
  {
    path:"seller",
    component:SellerComponent
  },
  {
    path:"404",
    component:PagenotfoundComponent
  },
  
  {
    path:"**",
    component:PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
