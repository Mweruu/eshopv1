import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, ORDER_STATUS } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'admin-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit,OnDestroy{
  form!:FormGroup;
  currentId!:string;
  order!:any;
  selectedStatus:any;
  orderStatuses : Array<{ id: number; name: string }> = [];
  endsubs$: Subject<any> = new Subject();


  constructor( private fb:FormBuilder,
               private ordersService: OrdersService,
               private messageService:MessageService,
               private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    this._mapOrderStatus();
    this ._getOrders();
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

  private _mapOrderStatus() {
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      const numericKey = parseInt(key, 10); // Parse the key as a number
      return {
        id: numericKey,
        name: ORDER_STATUS[numericKey].label
      };
    });
  }
  // private _mapOrderStatus(){
  //   // const arrayObject = Object.values(ORDER_STATUS);
  //   // console.log(arrayObject);
  //   // this.rr = arrayObject
  //   this.orderStatuses = Object.keys(ORDER_STATUS).map((key)=>{
  //     const numericKey = parseInt(key); // Convert key to a number

  //     return{
  //       id:numericKey,
  //       name:ORDER_STATUS[numericKey].label
  //     }
  //   });
  //   // console.log(arrayObject);
  //   // this.orderStatuses = arrayObject
  // }

  onStatusChange(event:any){
   console.log("tytyy", event.value.name, this.currentId)
   this.ordersService.updateOrder(this.currentId,{ status:event.value.name }).pipe(takeUntil(this.endsubs$)).subscribe(()=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Order is updated!'
      });

    },
    () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Order is not updated!'
      });
    }
   )
  }

  private _getOrders(){
    this.activatedRoute.params.subscribe(params=>{
      if(params['id']){
        this.currentId = params['id']
        this.ordersService.getOrder(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(order =>{
          this.order = order
          console.log (order)
          this.selectedStatus = order.status;
        })
      }
    })
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
