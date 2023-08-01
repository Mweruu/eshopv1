import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit{
  form!:FormGroup
  constructor( private fb:FormBuilder,
              private productsService:ProductsService,
              private messageService:MessageService,
               private router:Router){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color:['', Validators.required],
    })
  }

  onSubmit(){
    const product = {
      name:this.productsForm['name'].value,
      icon:this.productsForm['icon'].value

    }
    if(this.form.invalid){
      return;
    }
    this.productsService.createProducts(product).subscribe(
      product =>{
        console.log(product)
        this.messageService.add({
          severity:'success',
          summary:'Product successfully created', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/orders'])
          })
      })
  }

  get productsForm(){
    return this.form.controls
  }
}
