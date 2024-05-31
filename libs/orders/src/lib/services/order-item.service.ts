import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderItem } from '../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class OrderItemService {

  // constructor() {}
    BASE_URL='https://eshopbackend-nrdd.onrender.com/api/'
    // BASE_URL = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    getOrderItems(): Observable<OrderItem[]>{
      return this.http.get<OrderItem[]>(`${this.BASE_URL}getorderitems`)
    }
    createOrderItem(orderItem:OrderItem): Observable<OrderItem[]>{
      return this.http.post<OrderItem[]>(`${this.BASE_URL}createorderitem` ,OrderItem)
    }

    getOrderItem(orderId:string): Observable<OrderItem>{
      return this.http.get<OrderItem>(`${this.BASE_URL}getorderitem/${orderId}`)
    }

}
