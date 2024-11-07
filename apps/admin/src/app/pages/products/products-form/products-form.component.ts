import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductsService, Category, CategoriesService } from '@eshop/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { LocalstorageService } from '@eshop/users';
import { DataService } from '@eshop/products';

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
  // imageDisplay!:string | ArrayBuffer;
  imageDisplay:string[] = [];
  endsubs$: Subject<any> = new Subject();
  userId!:string;
  uploadedFiles: any[] = [];
  imageForm!:FormGroup;
  file:any;
  imageUploaded = false;

  constructor( private fb:FormBuilder,
              private productsService:ProductsService,
              private messageService:MessageService,
              private router:Router,
              private activatedRoute:ActivatedRoute,
              private categoriesService:CategoriesService,
              private localStorage:LocalstorageService,
              private imageDataService: DataService,
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
      imageDisplay:[''],
      isFeatured:[false],

    });
    this.imageForm= this.fb.group({
      images: new FormControl(),
    })
    this._getCategories();
    this._checkEditMode();
  }

  private _getCategories(){
    this.categoriesService.getCategories().pipe(takeUntil(this.endsubs$)).subscribe((categories)=>{
      this.categories =categories;
    })
  }

  private _checkEditMode(){
    this.activatedRoute.params.pipe(takeUntil(this.endsubs$)).subscribe(params => {
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.productsService.getProduct(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(product=>{
          this.form.patchValue({
            name: product.name,
            description: product.description,
            price: product.price,
            brand: product.brand,
            countInStock: product.countInStock,
            richDescription: product.richDescription,
            category: product.category?.id,
            isFeatured: product.isFeatured
          });
          if(product.images){
            this.imageDisplay = product.images
          }
          // this.imageUpload['images'].setValue(product.image);
          // this.imageUpload['images'].setValue(product.images);
          console.log(this.imageDisplay, product.image, product.images)
        })
      }
    })
  }

  onImageUpload(event: any){
    try {
      this.uploadedFiles.push(...event.files);
      this.file = event.files[0];
      this.imageUploaded = true;
      this.messageService.add({ severity: 'info', summary: 'File Uploaded', detail: `${event.files.length} Image(s) uploaded` });
    } catch (err) {
      this.messageService.add({ severity: 'danger', summary: 'Image(s) Upload Failed', detail: `Failed to upload Images` });
    }
  }

  onSubmit(){
    this.imageDataService.setuploadPictureData(this.uploadedFiles);

    const images :File[] = this.imageDataService.getuploadPictureData();
    this.isSubmitted = true
    if(this.form.invalid){
      return;
    }
    const token = this.localStorage.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      this.userId = tokenDecode.userId
    }

    const productsData = new FormData();
    productsData.append("userId", this.userId);
    productsData.append("brand", this.productsForm['brand'].value);
    productsData.append("name", this.productsForm['name'].value);
    productsData.append("description", this.productsForm['description'].value);
    productsData.append("price", this.productsForm['price'].value);
    productsData.append("isFeatured", this.productsForm['isFeatured'].value);
    productsData.append("categoryId", this.productsForm['category'].value);
    productsData.append("richDescription", this.productsForm['richDescription'].value);
    productsData.append("countInStock", this.productsForm['countInStock'].value);
    for (let i = 0; i < images.length; i++) {
      productsData.append('images', images[i]);
    }
    if (this.editMode && this.imageDisplay.length > 0) {
      for (let i = 0; i < this.imageDisplay.length; i++) {
        productsData.append('existingImages', this.imageDisplay[i]); 
      }
    }
    if(this.editMode){
      this._updateProduct(productsData)
    }else{
      this._createProduct(productsData)
    }
  }

  private _createProduct(product: FormData){
    this.productsService.createProducts(product).pipe(takeUntil(this.endsubs$)).subscribe(
     ( product:Product )=>{
        this.messageService.add({
          severity:'success',
          summary:'success',
          detail: `Product ${product.name} is created!`
        });
          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/products'])
          })
      }, error=> {
        console.error("Failed to create product",error)
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
      );
  }

  private _updateProduct(product:FormData){
    this.productsService.updateProduct(this.currentId,product).subscribe(
      product =>{
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
          summary:'Product is not updated ${error}'})
      }
      );
  }

  get productsForm(){
    return this.form.controls
  }
  get imageUpload(){
    return this.imageForm.controls;
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
