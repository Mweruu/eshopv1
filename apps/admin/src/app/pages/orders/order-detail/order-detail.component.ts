import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService, ORDER_STATUS } from '@eshop/orders';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { OrderItem } from '../../../../../../../libs/orders/src/lib/models/order-item'
import { OrderItemService } from '../../../../../../../libs/orders/src/lib/services/order-item.service'
import { ProductsService } from '../../../../../../../libs/products/src/lib/services/products.service'
import { Product } from 'libs/products/src/lib/models/product';

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
  orderStatuses !: Array<{ id: number; name: string }>;
  orderItems:OrderItem[]=[];
  selectedOrderStatus!: number;
  endsubs$: Subject<any> = new Subject();
  product!: Product;
  products:Product[]=[];
  // productArray !: Array<{ products: Product; quantity: number }>;
  productArray: { products: Product; quantity: number; subtotal: number }[] = [];
  totalPrice!:number;


  constructor( private fb:FormBuilder,
               private ordersService: OrdersService,
               private messageService:MessageService,
               private OrderItemService:OrderItemService,
               private productsService:ProductsService,
               private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {
    console.log("init")
    // this._mapOrderStatus();
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
    console.log("map", this.order, "this.order.status")
    this.orderStatuses = Object.keys(ORDER_STATUS).map((key) => {
      const numericKey = parseInt(key, 10); // Parse the key as a number
      return {
        id: numericKey,
        name: ORDER_STATUS[numericKey].label
      };
    });
  }

  onStatusChange(event:any){
   console.log("tytyy",event.value,event, event.value.name, this.currentId)
   this.ordersService.updateOrder(this.currentId,{ status:event.value }).pipe(takeUntil(this.endsubs$)).subscribe(()=>{
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
      console.log(params, params['id'])
      if(params['id']){
        this.currentId = params['id']
        this.ordersService.getOrder(this.currentId).pipe(takeUntil(this.endsubs$)).subscribe(order =>{
          this.order = order;
          this._mapOrderStatus();
          this.setOrderStatusName();
          console.log(666, order, order.orderItems)
          if(order.orderItems){
            order.orderItems.forEach(item =>{
              console.log(item, item.productId, item.quantity)
              if(item.productId){
                this.productsService.getProduct(item.productId).pipe(takeUntil(this.endsubs$)).subscribe(product =>{
                  this.product =product
                  console.log("rt8uy875", this.product.price ,item.quantity)
                  this.products.push(product)
                  if(item.quantity && product.price){
                    this.productArray.push({ products: product, quantity: item.quantity, subtotal: (product.price* item.quantity)});
                  }
                  console.log("66tyghghuy", this.products, this.productArray, product.price)
                })
              }
            })
          }
          // this.orderItems = order.orderItems
        });
      }
    });
  }

  private setOrderStatusName() {
    const orderStatusId = parseInt(this.order.status, 10);
    const orderStatus = this.orderStatuses.find(status => status.id === orderStatusId);
    this.selectedStatus = orderStatus ? orderStatus?.name : '';
    this.order.status = this.selectedStatus
    console.log(this.selectedStatus, this.order)
  }

  ngOnDestroy() {
    // this.endsubs$.next();
    this.endsubs$.complete();
  }
}
