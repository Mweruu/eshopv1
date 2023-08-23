import { Injectable } from '@angular/core';
import { CartItem, Cart } from '../models/cart';
import { BehaviorSubject } from 'rxjs';


export const CART_KEY = "cart"
@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart$:BehaviorSubject<Cart> = new BehaviorSubject(this.getCartItem());

  // constructor() { }

  initCartLocalStorage(){
    const cart: Cart = this.getCartItem();
    if(!cart){
    const initialCart = {
      items:[]
    };
    const initialCartJson = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY, initialCartJson)
    }
  }

  emptyCart(){
    const initialCart = {
      items:[]
    };
    const initialCartJson = JSON.stringify(initialCart)
    localStorage.setItem(CART_KEY, initialCartJson)
    this.cart$.next(initialCart);

  }

  getCartItem():Cart{
    const cartData = localStorage.getItem(CART_KEY);
    const cart: Cart =  cartData ? JSON.parse(cartData) : { items: [] };
    // // const cart: Cart = JSON.parse(localStorage.getItem(CART_KEY))
    return cart
    // if (cartData !== null) {
    //   try {
    //     const cart: Cart = JSON.parse(cartData);
    //     return cart;
    //   } catch (error) {
    //     console.error("Error parsing cart data:", error);
    //   }
    // }

    // return { items: [] };
  }

  setCartItem(cartItem:CartItem, updateCartItem?:boolean):Cart{
    const cart = this.getCartItem();
    const cartItemExist = cart.items?.find((item) => item.productId == cartItem.productId)
    if(cartItemExist){
      cart.items?.map((item) =>{
        if(item.productId === cartItem.productId){
          if (item.quantity !== undefined && cartItem.quantity !== undefined) {
            if(updateCartItem){
              item.quantity = cartItem.quantity
            }else{
              item.quantity = item.quantity + cartItem.quantity;
            }
            // return item

          }
        }
        return item

      })
    }else{
      cart.items?.push(cartItem);

    }

    const CartJson = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, CartJson)
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId:string){
    const cart = this.getCartItem();
    const newCart = cart.items?.filter(item => item.productId !== productId);
    cart.items = newCart;
    const cartJsonString = JSON.stringify(cart)
    localStorage.setItem(CART_KEY, cartJsonString)
    this.cart$.next(cart);
    // return cart;
  }

}
