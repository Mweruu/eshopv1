import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../models/category';
import { CategoriesService } from '../../services/categories.service';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { Router } from '@angular/router';

@Component({
  selector: 'eshop-products-categories-banner',
  templateUrl: './categories-banner.component.html',
  styleUrls: ['./categories-banner.component.scss'],
})
export class CategoriesBannerComponent implements OnInit,OnDestroy{
  categories:Category[] = [];
  endSUbs$: Subject<string> = new Subject();
  products:Product[]=[];

  constructor( private categoriesService:CategoriesService,
               private router:Router
               ){}

  ngOnInit(): void {
      this.categoriesService.getCategories().pipe(takeUntil(this.endSUbs$)).subscribe(categories =>{
        this.categories = categories
      })
  }

  getCatProducts(categoryId:string){
      this.router.navigateByUrl(`category/${categoryId}`);
    }

  ngOnDestroy(): void {
      this.endSUbs$.complete();
  }
}
