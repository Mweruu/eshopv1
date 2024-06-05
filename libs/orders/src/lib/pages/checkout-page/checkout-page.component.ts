import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '@eshop/users';
import { OrderItem } from '../../models/order-item';
// import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { OrderItemService } from '../../services/order-item.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { MessageService } from 'primeng/api';
import { Subject, take, takeUntil } from 'rxjs';


@Component({
  selector: 'eshop-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit, OnDestroy{
  form!:FormGroup;
  itemsForm!:FormGroup;
  isSubmitted = false;
  countries:any[] =[];
  orderItems:OrderItem[]=[];
  userId!:string;
  endSubs$:Subject<any> = new Subject;
  totalPrice!:number;
  emailControl= new FormControl('',[ Validators.email, Validators.required]);

  constructor(private router:Router,
              private fb:FormBuilder,
              private usersService:UsersService,
              private cartService:CartService,
              private ordersService:OrdersService,
              private messageService:MessageService,
              private OrderItemService:OrderItemService,
              private activatedRoute:ActivatedRoute
              ){}

  ngOnInit(): void {
    this.form = this.fb.group({
      name:['', Validators.required],
      email:this.emailControl,
      phone:['', Validators.required],
      city:['', Validators.required],
      apartment:['', Validators.required],
      street:['', Validators.required],
      country:['', Validators.required],
      zip:['', Validators.required],
    })

    this._getCartItems();
    this._getCountries();
    this._autofillUserData();
    this._getOrderSummary();

  }


  private _autofillUserData(){
    this.usersService.observeCurrentUser().pipe(takeUntil(this.endSubs$)).subscribe(user =>{
      if(user){
        if(user?.id){
          this.userId = user.id
        }
        this.usersForm['name'].setValue(user.name);
        this.usersForm['email'].setValue(user.email);
        this.usersForm['street'].setValue(user.street);
        this.usersForm['apartment'].setValue(user.apartment);
        this.usersForm['city'].setValue(user.city);
        this.usersForm['zip'].setValue(user.zip);
        this.usersForm['country'].setValue(user.country);
        this.usersForm['phone'].setValue(user.phone)
      }
    })
  }

  private _getCountries(){
    this.countries = this.usersService.getCountries()

  }

  backtoCart(){
    this.router.navigate(['/cart'])
  }

  private _getCartItems(){
    const cart: Cart = this.cartService.getCartItem();
    this.orderItems = this.orderItems = cart.items?.map((item) => ({
      product: item.productId || "",
      quantity: item.quantity || 0,
    })) as OrderItem[];
    // cart.items?.map((item) =>{
    //   return{
    //     product:item.productId,
    //     quantity:item.quantity
    //   }
    // })

  }



  private _getOrderSummary(){
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart =>{
      this.totalPrice = 0;
      if (cart) {
          cart.items?.map((item) => {
            if (item.productId) {
            this.ordersService.getProduct(item.productId).pipe(take(1)).subscribe((product) => {
              if(item.quantity){
                this.totalPrice += product.price * item.quantity
              }
              });
            }
          });
      }
    })
  }


  private _createOrderItems(orderItem:OrderItem){
    if(this.itemsForm.invalid){
      return;
    }
    this.OrderItemService.createOrderItem(orderItem).subscribe(
      orderItem =>{
        this.messageService.add({
          severity:'success',
          summary:'Orderitem successfully created', });
      },error=>{
        console.error("Failed to create orderitem",error)
        this.messageService.add({
          severity:'error',
          summary:'Failed to create orderitem'})
      }
      )

  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.form.invalid || this.totalPrice <= 0){
        return;
    }
    const order = {
      orderItems: this.orderItems,
      shippingAddress1: this.usersForm['street'].value,
      shippingAddress2: this.usersForm['apartment'].value,
      city: this.usersForm['city'].value,
      zip: this.usersForm['zip'].value,
      country: this.usersForm['country'].value,
      phone: this.usersForm['phone'].value,
      status: 'Pending',
      // status: '0',
      userId: this.userId,
      totalPrice:this.totalPrice,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      (response:any) => {
        const order = response.order;
        this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe(cart =>{
          this.totalPrice = 0;
          if (cart) {
              cart.items?.map((item) => {
                if (item.productId) {
                this.ordersService.getProduct(item.productId).pipe(take(1)).subscribe((product) => {
                  if(item.quantity){
                    this.itemsForm = this.fb.group({
                      product:[item.productId, Validators.required],
                      quantity:[item.quantity, Validators.required],
                      user:[this.userId],
                      order:[order.id, Validators.required]
                    })
                    const orderItems:OrderItem = {
                      productId:this.orderItemsForm['product'].value,
                      quantity:this.orderItemsForm['quantity'].value,
                      orderId:this.orderItemsForm['order'].value,
                      userId:this.orderItemsForm['user'].value,
                    }
                    this._createOrderItems(orderItems);
                    this.totalPrice += product.price * item.quantity
                  }
                  });
                }
              });
          }
        })


        //redirect to thank you page // payment
        this.cartService.emptyCart();
        this.messageService.add({
          severity:'success',
          summary:'Order successfully created'
        })
        this.router.navigate(['/success']);
      },
      (err) => {
        console.log(err);
        this.messageService.add({
          severity:'error',
          summary:'Failed to create order'
        })
        //display some message to user
      }
    );

  }

  get usersForm(){
    return this.form.controls
  }

  get orderItemsForm(){
    return this.itemsForm.controls
  }

  ngOnDestroy(): void {
    // this.endSubs$.next();
    this.endSubs$.complete();
  }
}
