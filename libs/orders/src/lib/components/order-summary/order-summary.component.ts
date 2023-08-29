import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, take, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
})
export class OrderSummaryComponent implements OnInit, OnDestroy{
  endSubs$:Subject<any>= new Subject;
  totalPrice!:number;
  isCheckout = false;


  constructor(private cartService:CartService,
              private ordersService:OrdersService,
              private router:Router){
                this.router.url.includes('checkout')? this.isCheckout = true : this.isCheckout=false
              }

  ngOnInit(): void {
      this._getOrderSummary();
  }

  private _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart =>{
      this.totalPrice = 0;
      if (cart) {
          cart.items?.map((item) => {
            if (item.productId) {
            this.ordersService.getProduct(item.productId).pipe(take(1)).subscribe((product) => {
              if(item.quantity){
                // item.quantity * product.price
                this.totalPrice += product.price * item.quantity
              }
              });
            }
          });
      }
    })
  }

  checkout(){
    this.router.navigate(['/checkout'])
  }

  ngOnDestroy(): void {
    this.endSubs$.complete()
  }
}
