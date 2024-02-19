import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@eshop/orders';
import { Product, ProductsService } from '@eshop/products';
import { User, UsersService } from '@eshop/users';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  orders:Order[] = [];
  users:User[] = [];
  products:Product[] = [];
  totalSales = 0;

  constructor(private ordersService: OrdersService,
              private userService: UsersService,
              private productService: ProductsService
              ){}

  ngOnInit(): void {
      this.getOrders();
      this.getUsers();
      this.getProducts();
  }

  getOrders(){
    this.totalSales = 0;
    this.ordersService.getOrders().subscribe((orders)=>{
      this.orders =orders;
      console.log(this.orders);
      for(const order of this.orders){
        console.log(order.totalPrice);
        if(order.totalPrice !== undefined){
          this.totalSales += order.totalPrice * 1;
          console.log(this.totalSales);
        }
      }
    });
  }

  getUsers(){
    this.userService.getUsers().subscribe((users) =>{
      this.users = users
    })
  }

  getProducts(){
    this.productService.getProducts().subscribe((products) =>{
      this.products = products
    })
  }

}
