import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit{
  form!:FormGroup;
  isSubmitted = false;

  constructor( private fb:FormBuilder,
              private categoriesService:CategoriesService,
              private messageService: MessageService,
              private router:Router){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      // color:['', Validators.required]
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category = {
      name: this.categoriesForm['name'].value,
      icon: this.categoriesForm['icon'].value,
    }
    this.categoriesService.createCategories(category).subscribe(
      category =>{
        this.messageService.add({
          severity:'success',
          summary:'Category successfully created',
})
          console.log('Category successfully created',category);

      timer(3500).toPromise().then(()=>{
        this.router.navigate(['/categories'])
      })

      },error=>{
        console.error("Failed to create category",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to create category'})
      }
      )
  }

  get categoriesForm(){
    return this.form.controls
  }
}
