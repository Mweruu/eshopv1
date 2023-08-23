import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent implements OnInit{
  form!:FormGroup;
  editMode=false;
  currentId!:string;

  constructor( private fb:FormBuilder,
               private ordersService: OrdersService,
               private messageService:MessageService,
               private router:Router,
               private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this.form = this.fb.group({
      shippingAddress1:['', Validators.required],
      shippingAddress2:['', Validators.required],
      city:['', Validators.required],
      zip:['', Validators.required],
      country:['', Validators.required],
      phone:['', Validators.required],
      status:['', Validators.required],
      totalPrice:['', Validators.required],
    })

    this._checkEditMode()
  }

  private _checkEditMode(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.ordersService.getOrder(this.currentId).subscribe(order =>{
          this.ordersForm['shippingAddress1'].setValue(order.shippingAddress1)
          this.ordersForm['shippingAddress2'].setValue(order.shippingAddress2)
          this.ordersForm['city'].setValue(order.city)
          this.ordersForm['zip'].setValue(order.zip)
          this.ordersForm['country'].setValue(order.country)
          this.ordersForm['phone'].setValue(order.phone)
          this.ordersForm['status'].setValue(order.status)
          this.ordersForm['totalPrice'].setValue(order.totalPrice)

        })
      }
    })
  }
  onSubmit(){
    if(this.form.invalid){
      return;
    }

    const order:Order= {
      shippingAddress1:this.ordersForm['shippingAddress1'].value,
      shippingAddress2:this.ordersForm['shippingAddress2'].value,
      city:this.ordersForm['city'].value,
      zip:this.ordersForm['zip'].value,
      country:this.ordersForm['country'].value,
      phone:this.ordersForm['phone'].value,
      status:this.ordersForm['status'].value,
      totalPrice:this.ordersForm['totalPrice'].value

    }

    if(this.editMode){
      this._updateOrder(order)
    }else{
      this._createOrder(order)
    }


  }

  private _createOrder(order:Order){
    this.ordersService.createOrder(order).subscribe(
      order =>{
        console.log(order)
        this.messageService.add({
          severity:'success',
          summary:'Order successfully created', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/orders'])
          })

      },error=>{
        console.error("Failed to create order",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to create order'})
      }
      )

  }
  private _updateOrder(order:Order){
    this.ordersService.updateOrder(this.currentId,order).subscribe(
      order =>{
        console.log(order)
        this.messageService.add({
          severity:'success',
          summary:'Order successfully updated', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/orders'])
          })

      },error=>{
        console.error("Failed to update order",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to update order'})
      }
      )

  }

  get ordersForm(){
    return this.form.controls
  }
}
