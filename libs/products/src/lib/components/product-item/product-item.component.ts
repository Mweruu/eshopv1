import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

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


  constructor(private router:Router){}

  viewProduct(producId:string){
    this.router.navigateByUrl(`/products/${producId}`)
  }
}
