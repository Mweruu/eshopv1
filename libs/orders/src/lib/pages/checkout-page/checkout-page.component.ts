import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '@eshop/users';
import { OrderItem } from '../../models/order-item';
import { Order } from '../../models/order';
import { CartService } from '../../services/cart.service';
import { Cart } from '../../models/cart';
import { OrdersService } from '../../services/orders.service';
import { ORDER_STATUS } from '../../order.constants';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'eshop-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent implements OnInit{
  form!:FormGroup;
  isSubmitted = false;
  countries:any[] =[];
  orderItems:OrderItem[]=[];
  // userId!:string;
  userId!:'14';

  emailControl= new FormControl('',[ Validators.email, Validators.required]);

  constructor(private router:Router,
              private fb:FormBuilder,
              private usersService:UsersService,
              private cartService:CartService,
              private ordersService:OrdersService,
              private messageService:MessageService
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
    this._getCartItems()
    this._getCountries();

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
      quantity: item.quantity || 0
    })) as OrderItem[];


    // cart.items?.map((item) =>{
    //   return{
    //     product:item.productId,
    //     quantity:item.quantity
    //   }
    // })

    console.log(this.orderItems)
  }

  placeOrder(){
    this.isSubmitted = true;
    if(this.form.invalid){
      return;
    }
    console.log(888)

    const order: Order = {
      orderItems: this.orderItems,
      shippingAddress1: this.usersForm['street'].value,
      shippingAddress2: this.usersForm['apartment'].value,
      city: this.usersForm['city'].value,
      zip: this.usersForm['zip'].value,
      country: this.usersForm['country'].value,
      phone: this.usersForm['phone'].value,
      status: Object.keys(ORDER_STATUS)[0],
      user: this.userId,
      dateOrdered: `${Date.now()}`
    };

    this.ordersService.createOrder(order).subscribe(
      () => {
        console.log(888)
      console.log(order)

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
}
