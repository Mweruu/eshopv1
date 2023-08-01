import { Component, OnInit } from '@angular/core';
import { Order, OrdersService } from '@eshop/orders';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit{
  orders:Order[] = [];

  constructor(private ordersService: OrdersService){}

  ngOnInit(): void {
      this.getOrders()
  }

  getOrders(){
    this.ordersService.getOrders().subscribe((orders)=>{
      console.log(orders);
      this.orders =orders
      console.log(this.orders)
    })
  }

}
