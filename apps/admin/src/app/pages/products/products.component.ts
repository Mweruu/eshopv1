import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@eshop/products';
import { UsersService } from '@eshop/users';
import { MessageService,ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  userId!:string;
  constructor(private productsService:ProductsService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService,
              private router: Router,private usersService: UsersService
            ){}

  ngOnInit(): void {
      this.getProducts();
  }

  getProducts(){
    this.productsService.getProducts().subscribe((products)=>{
      this.products = products;
    })
  }

  deleteProduct(productId:string){
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.productsService.deleteProduct(productId).subscribe((response)=>{
      this.getProducts();
      this.messageService.add({
        severity:'success',
        summary:'product successfully deleted'
      })
    }, error =>{
      console.log(error)
      this.messageService.add({
        severity:'error',
        summary:'Failed to delete product'
      })
    });
    },
    reject: () => {console.log("response")}
    });
  }

  editProduct(productId:string){
  this.router.navigateByUrl(`products/form/${productId}`)
  }
}
