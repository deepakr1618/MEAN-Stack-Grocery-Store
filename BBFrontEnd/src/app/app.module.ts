import { NotSupportedComponent } from './components/not-supported/not-supported.component';
import { ItemViewComponent } from './components/seller/item-view/item-view.component';
import { SellerComponent } from './components/seller/seller.component';
import { OrdersComponent } from './components/orders/orders.component';
import { GetDetailsComponent } from './components/checkout/get-details/get-details.component';
import { MongooseService } from './services/auth/mongoose/mongoose.service';
import { FirebaseAuthService } from './services/auth/firebase-auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { SectionsComponent } from './components/landing/sections/sections.component';
import { ViewTypeComponent } from './components/view-type/view-type.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { ItemCardComponent } from './components/view-type/item-card/item-card.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutItemComponent } from './components/checkout/checkout-item/checkout-item.component';
import { OrderCardComponent } from './components/orders/order-card/order-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    CustomButtonComponent,
    SectionsComponent,
    ViewTypeComponent,
    PagenotfoundComponent,
    ItemCardComponent,
    NotificationComponent,
    CheckoutComponent,
    CheckoutItemComponent,
    SignupComponent,
    GetDetailsComponent,
    OrdersComponent,
    OrderCardComponent,
    SellerComponent,
    ItemViewComponent,
    NotSupportedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule
  ],
  providers: [FirebaseAuthService,MongooseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
