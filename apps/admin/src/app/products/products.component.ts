import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from '@eshop/products';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor( private productsService:ProductsService){}

  ngOnInit(): void {
    console.log('gothere')
      this.getProducts()
  }

  getProducts(){
    this.productsService.getProducts().subscribe((products)=>{
      this.products = products;
      console.log(this.products)
    })
  }

}
