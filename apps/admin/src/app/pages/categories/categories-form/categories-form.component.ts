import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService, Category } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [],
})
export class CategoriesFormComponent implements OnInit,OnDestroy{
  form!:FormGroup;
  isSubmitted = false;
  editMode = false;
  currentId!:string;
  endsubs$: Subject<any> = new Subject();

  constructor( private fb:FormBuilder,
              private categoriesService:CategoriesService,
              private messageService: MessageService,
              private router:Router,
              // private location:Location,
              private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color:['#ffff']
    })

    this._checkEditMode()
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe((params) =>{
      if(params['id']){
        this.editMode = true
        this.currentId = params['id']
        this.categoriesService.getCategory(this.currentId).subscribe(category =>{
          console.log(category.id)
            this.categoriesForm['name'].setValue(category.name),
            this.categoriesForm['icon'].setValue(category.icon)
            this.categoriesForm['color'].setValue(category.color)
        })
      }
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const category = {
      id: this.currentId,
      name: this.categoriesForm['name'].value,
      icon: this.categoriesForm['icon'].value,
      color: this.categoriesForm['color'].value,

    }
      if(this.editMode){
        this._updateCategory(category)
      }else{
        this._createCategory(category)
      }
  }


  private _createCategory(category:Category){
    this.categoriesService.createCategories(category).subscribe(
      category =>{
        this.messageService.add({
          severity:'success',
          summary:`Category ${category.name}  successfully created`,
        })

        timer(3500).toPromise().then(()=>{
          this.router.navigate(['/categories'])
        })

        // timer(2000).toPromise().then((done)=>{
        //   this.location.back()
        // })

        },error=>{
          console.error("Failed to create category",error)
          this.messageService.add({
            severity:'error',
            summary:'Failed to create category'})
        }
    )
  }


  private _updateCategory(category:Category){
    this.categoriesService.updateCategory(this.currentId,category).pipe(takeUntil(this.endsubs$)).subscribe(category=>{
      console.log(category)
      this.messageService.add({
        severity:'success',
        summary:`Category ${category.name} successfully updated`,
        });

    timer(3500).toPromise().then(()=>{
      this.router.navigate(['/categories'])
    })

    },error=>{
      console.error("Failed to update category",error)
      this.messageService.add({
        severity:'error',
        summary:'Failed to update category'})
    }
    )
  }


  get categoriesForm(){
    return this.form.controls
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
