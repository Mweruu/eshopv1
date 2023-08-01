import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-orders-form',
  templateUrl: './orders-form.component.html',
  styleUrls: ['./orders-form.component.scss'],
})
export class OrdersFormComponent implements OnInit{
  form!:FormGroup
  constructor( private fb:FormBuilder,
               private ordersService: OrdersService,
               private messageService:MessageService,
               private router:Router){}

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
  }

  onSubmit(){
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
    if(this.form.invalid){
      return;
    }
    this.ordersService.createOrders(order).subscribe(
      order =>{
        console.log(order)
        this.messageService.add({
          severity:'success',
          summary:'Order successfully created', });

          timer(3500).toPromise().then(()=>{
            this.router.navigate(['/orders'])
          })

      })

  }

  get ordersForm(){
    return this.form.controls
  }
}
