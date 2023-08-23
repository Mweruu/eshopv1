import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CartItem, CartService } from '@eshop/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input()
  product: Product
    // product : Product[] = []
    = new Product;
  // product : Product[] = []


  constructor(private router:Router,
              private cartService:CartService,
              private messageService:MessageService){}

  viewProduct(producId:string){
    this.router.navigateByUrl(`/products/${producId}`)
  }

  addProductToCart(){
    const cartItem : CartItem = {
      productId:this.product.id,
      quantity:1
    }
    this.cartService.setCartItem(cartItem)
    if(cartItem){
      console.log(cartItem)
      this.messageService.add({
        severity:'success',
        summary:`${cartItem.quantity} Item added to cart`,
      })
    }else{
      this.messageService.add({
      severity:'error',
      summary:'Item not added to cart',
    })
  }
  }
}
