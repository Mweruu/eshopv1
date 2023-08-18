import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../models/product';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'eshop-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit,OnDestroy{
  product!: Product
  endSubs$:Subject<any> = new Subject;
  sum = 16;
  quantity!:number;

  constructor(private productsService:ProductsService,
              private router:Router,
              private activatedRoute:ActivatedRoute){}

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
    console.log("Addtocart!?!?!?!?!")
  }

  ngOnDestroy(): void {
      // this.endSubs$.next();
      this.endSubs$.complete();

  }
}
