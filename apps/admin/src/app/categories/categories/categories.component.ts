import { Component, OnInit } from '@angular/core';
import { CategoriesService, Category} from '@eshop/products';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit{
  categories: Category[] = [];
  constructor( private categoriesService:CategoriesService,){}

  ngOnInit(): void {
      this.getCategories()
  }

  getCategories(){
    this.categoriesService.getCategories().subscribe((categories)=>{
      console.log(categories)
      this.categories =categories;
      console.log(this.categories)

    })
  }


}
