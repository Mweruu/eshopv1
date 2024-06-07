import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { CartService } from './services/cart.service';
import { CartIconComponent } from './components/cart-icon/cart-icon.component';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { RouterModule, Routes } from '@angular/router';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ToastModule } from 'primeng/toast';
import { AuthGuardUsersideService } from '@eshop/users';
import { LoginComponent } from 'libs/users/src/lib/pages/login/login.component';
import { UserDetailsComponent } from 'libs/users/src/lib/pages/user-details/user-details.component';
import { SignupComponent } from 'libs/users/src/lib/pages/signup/signup.component';

export const routes: Routes = [
  { path: 'cart', component: CartPageComponent },
  { path: 'checkout',
    canActivate:[AuthGuardUsersideService],
    component: CheckoutPageComponent },
  { path: 'success', component: ThankYouComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserDetailsComponent },
  { path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [
    CommonModule,
    BadgeModule,
    ButtonModule,
    InputNumberModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    DropdownModule,
    ToastModule,
  ],

  declarations: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent,
    CheckoutPageComponent,
    ThankYouComponent,
  ],

  exports: [
    CartIconComponent,
    CartPageComponent,
    OrderSummaryComponent],

})
export class OrdersModule {
  constructor(private http: HttpClient, cartService: CartService) {
    cartService.initCartLocalStorage();
  }

  getOrders() {
    return this.http.get('https://eshopbackend-nrdd.onrender.com/api/getorders');
  }
}
