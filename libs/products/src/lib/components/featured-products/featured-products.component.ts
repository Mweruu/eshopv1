import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'eshop-featured-products',
  templateUrl: './featured-products.component.html',
  styleUrls: ['./featured-products.component.scss'],
})
export class FeaturedProductsComponent implements OnInit{
  featuredProducts:Product [] = []
  products:Product[] = [];

  constructor(private productsService: ProductsService){}

  ngOnInit(): void {
      this.productsService.getProducts().subscribe(products =>{
        this.products = products
        this.featuredProducts = products.filter(product => product.isFeatured);
      });
  }
}
