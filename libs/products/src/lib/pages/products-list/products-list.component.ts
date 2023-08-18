import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/product';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector:'eshop-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit{
  products:Product[]=[];
  categories:Category[]=[];
  currentCatId!:string[];
  isCategoryPage!:boolean;

  constructor(private productsService:ProductsService,
              private categoriesService:CategoriesService,
              private activatedRoute:ActivatedRoute
              ){}

  ngOnInit(): void {
      this._getCategories();
      this.activatedRoute.params.subscribe(params =>{
        if(params['categoryid']){
        this.isCategoryPage = true;
        this.currentCatId = [params['categoryid']];
        this.productsService.getProductbycatId(this.currentCatId).subscribe((products) =>{
          this.products = products;
          console.log(this.currentCatId,products)
        })
      }else{
        this.isCategoryPage = false;
        this._getProducts();
        }

      })
  }

  private _getProducts(){
    this.productsService.getProducts().subscribe(products =>{
      this.products = products;
    })

  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe(categories=>{
      this.categories = categories
    })
  }


  categoryFilter(){
    const selectedCategories = this.categories
    .filter((category) => category.checked)
    .map((category) => category.id)
    console.log(selectedCategories )
    this.productsService.getProductbycatId(selectedCategories).subscribe((products) =>{
      this.products = products;
      console.log(products)
    })

    // this._getProducts(selectedCategories);
  }


}
