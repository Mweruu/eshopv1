import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService, Category, CategoriesService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.scss'],
})
export class ProductsFormComponent implements OnInit ,OnDestroy{
  form!:FormGroup;
  editMode=false;
  currentId!:string;
  isSubmitted = false;
  products: Product[] = [];
  categories :Category[] = [];
  imageDisplay!:string | ArrayBuffer;
  endsubs$: Subject<any> = new Subject();

  constructor( private fb:FormBuilder,
              private productsService:ProductsService,
              private messageService:MessageService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private categoriesService:CategoriesService,
            ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      brand:['', Validators.required],
      price:['', Validators.required],
      countInStock:['', Validators.required],
      description:['', Validators.required],
      category:['', Validators.required],
      richDescription:[''],
      image:['', Validators.required],
      isFeatured:[false],

    });
    this._getCategories();
    this._checkEditMode();
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories)=>{
      this.categories =categories;
      console.log(this.categories);
    })
  }

  private _checkEditMode(){
    this.activatedRoute.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.productsService.getProduct(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(product=>{
          this.productsForm['name'].setValue(product.name);
          this.productsForm['description'].setValue(product.description);
          this.productsForm['price'].setValue(product.price);
          this.productsForm['brand'].setValue(product.brand);
          this.productsForm['countInStock'].setValue(product.countInStock);
          this.productsForm['richDescription'].setValue(product.richDescription);
          this.productsForm['category'].setValue(product.category);
          this.productsForm['image'].setValue(product.image);
          this.productsForm['isFeatured'].setValue(product.isFeatured);
          // this.imageDisplay = product.image;
          this.productsForm['image'].setValidators([]);
          this.productsForm['image'].updateValueAndValidity();

        })
      }
    })
  }

  onSubmit(){
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }

    const product = {
      id: this.currentId,
      name:this.productsForm['name'].value,
      brand:this.productsForm['brand'].value,
      description:this.productsForm['description'].value,
      price:this.productsForm['price'].value,
      image:this.productsForm['image'].value,
      isFeatured:this.productsForm['isFeatured'].value,
      categoryId:this.productsForm['category'].value,
      richDescription:this.productsForm['richDescription'].value,
      countInStock:this.productsForm['countInStock'].value,
    }
    console.log(product.categoryId)
    console.log(product)

    if(this.editMode){
      this._updateProduct(product)
    }else{
      this._createProduct(product)
    }
  }

  private _createProduct(product:Product){
    this.productsService.createProducts(product).pipe(takeUntil(this.endsubs$)).subscribe(
     ( product:Product )=>{
        console.log(product)
        this.messageService.add({
          severity:'success',
          summary:'success',
          detail: `Product ${product.name} is created!`
        });
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/products'])
          })
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
      );
  }

  private _updateProduct(product:Product){
    this.productsService.updateProduct(this.currentId,product).subscribe(
      product =>{
        console.log(product)
        this.messageService.add({
          severity:'success',
          summary:'Product successfully updated', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/products'])
          })
      },error=>{
        console.error("Failed to update product",error)
        this.messageService.add({
          severity:'error',
          summary:'Product is not updated'})
      }
      );
  }

  onImageUpload(event: any){
    console.log(event.target.files[0].name)
    const file = event.target.files[0];
    if(file){
      const fileReader = new FileReader();
      fileReader.onload = () =>{
        this.imageDisplay =  fileReader.result as string;
      }
      fileReader.readAsDataURL(file);
      console.log(fileReader.result,file)
    }
  }

  get productsForm(){
    return this.form.controls
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
