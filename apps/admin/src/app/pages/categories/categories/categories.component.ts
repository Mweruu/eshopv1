import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category} from '@eshop/products';
import { MessageService, ConfirmationService } from 'primeng/api';


@Component({
  selector: 'admin-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit{
  categories: Category[] = [];

  constructor( private categoriesService:CategoriesService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService,
              private router:Router){}

  ngOnInit(): void {
      this._getCategories()
  }

  private _getCategories(){
    this.categoriesService.getCategories().subscribe((categories)=>{
      this.categories =categories;
      console.log(this.categories)

    })
  }

  deleteCategory(categoryId:string){
    console.log("deleteCategory")
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe((response)=>{
          console.log(response)
          this._getCategories();
          this.messageService.add({
            severity:'success',
            summary:'Category successfully deleted'
          })
        }, error =>{
          console.log(error)
          this.messageService.add({
            severity:'error',
            summary:'Failed to delete category'
          })
        })
      },
      reject: () => {
        console.log("response")
    }
    });

  }

  editCategory(categoryId:string){
    this.router.navigateByUrl(`categories/form/${categoryId}`)
  }
}
