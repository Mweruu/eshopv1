import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product, ProductsService } from '@eshop/products';
import { MessageService,ConfirmationService } from 'primeng/api';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService:ProductsService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService,
              private router: Router
            ){}

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

  deleteProduct(productId:string){
    console.log("deleteproduct")
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.productsService.deleteProduct(productId).subscribe((response)=>{
      console.log(response)
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
