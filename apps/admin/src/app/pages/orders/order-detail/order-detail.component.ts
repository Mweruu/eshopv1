import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { ORDER_STATUS } from '../order.constants';


@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit{
  form!:FormGroup;
  editMode=false;
  currentId!:string;
  order!:Order;
  orderStatus= ORDER_STATUS;
  selectedStatus!:string;
  rr:any;

  constructor( private fb:FormBuilder,
               private ordersService: OrdersService,
               private messageService:MessageService,
               private router:Router,
               private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    const arrayObject = Object.values(ORDER_STATUS);
    console.log(arrayObject);
    this.rr = arrayObject

   this ._getOrders()
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
  get ordersForm(){
    return this.form.controls
  }

  // private _mapOrderStatus(){
  //   const arrayObject = Object.keys(ORDER_STATUS).map((key)=>{
  //     return{
  //       id:key,
  //       name:ORDER_STATUS[key].label
  //     }
  //   });
  //   console.log(arrayObject);
  //   this.rr = arrayObject
  // }

  onStatusChange(event:any){
   console.log("tytyy", event.value)
   this.ordersService.updateOrder(this.currentId,event.value).subscribe(order=>{
    console.log(order)
   })

  }

  private _getOrders(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.editMode = true;
        this.currentId = params['id']
        this.ordersService.getOrder(this.currentId).subscribe(order =>{
          this.order = order
          console.log (order)

        })
      }
    })
  }
}
