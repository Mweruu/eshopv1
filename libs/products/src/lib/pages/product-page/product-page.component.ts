import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';
import { CartItem, CartService } from '@eshop/orders';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'eshop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit,OnDestroy{
  product!: Product
  endSubs$:Subject<any> = new Subject;
  sum = 16;
  quantity = 1;

  constructor(private productsService:ProductsService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private cartService :CartService,
              private messageService:MessageService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params =>{
        if(params['productid']){
          this._viewProduct(params['productid'])
        }
      }
    )
  }

  private _viewProduct(productId:string){
    this.productsService.getProduct(productId).pipe(takeUntil(this.endSubs$)).subscribe(product =>{
      this.product = product
      console.log(this.product)
    })
  }

  addProductToCart(){
     const cartItem : CartItem = {
        productId:this.product.id,
        quantity:this.quantity
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

  ngOnDestroy(): void {
      // this.endSubs$.next();
      this.endSubs$.complete();

  }
}
