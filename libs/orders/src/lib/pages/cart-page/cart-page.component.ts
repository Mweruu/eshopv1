import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { OrdersService } from '../../services/orders.service';
import { CartItemDetailed } from '../../models/cart';

@Component({
  selector: 'eshop-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit, OnDestroy{
  quantity = 1;
  endSubs$:Subject<any> = new Subject;
  CartItemDetailed : CartItemDetailed[] = [];
  cartCount = 0;
  subtotal!:number;

  constructor(private router:Router,
              private cartService:CartService,
              private ordersService:OrdersService,){}

  ngOnInit(): void {
      this._getCartDetails();

  }

  private _getCartDetails(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe( cart =>{
      this.CartItemDetailed = [];
      this.cartCount = cart.items?.length ?? 0
      cart.items?.forEach(cartItem =>{
        if (cartItem.productId) {
          this.ordersService.getProduct(cartItem.productId).subscribe(product =>{
            this.CartItemDetailed.push({
              product:product,
              quantity:cartItem.quantity,
            })

          });
        }
      });
    })
  }

  backToShop(){
    this.router.navigate(['/products'])
  }

  deleteCartItem(cartItem:CartItemDetailed){
    this.cartService.deleteCartItem(cartItem.product.id)
    console.log("gg")
  }

  updateCartItemQuantity(event:any, cartItem:CartItemDetailed){
    console.log(event);
    this.cartService.setCartItem({
      productId:cartItem.product.id,
      quantity:event.value

    }, true)
  }

  ngOnDestroy(): void {
    // this.endSubs$.next()
      this.endSubs$.complete()
  }
}
