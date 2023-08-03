import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order, OrdersService } from '@eshop/orders';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit{
  orders:Order[] = [];

  constructor(private ordersService: OrdersService,
              private messageService:MessageService,
              private confirmationService:ConfirmationService,
              private router:Router,
              ){}

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

  deleteOrder(orderId:string){
    console.log("deleteorder")
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
    this.ordersService.deleteOrder(orderId).subscribe((response)=>{
      console.log(response)
      this.getOrders()
      this.messageService.add({
        severity:'success',
        summary:'order successfully deleted'
      })
    }, error =>{
      console.log(error)
      this.messageService.add({
        severity:'error',
        summary:'Failed to delete order'
      });
    });
  },
  reject: () => {console.log("response")}
  });
}


  editOrder(orderId:string){
  this.router.navigateByUrl(`orders/form/${orderId}`)
  }

}
