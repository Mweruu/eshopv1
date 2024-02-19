import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  BASE_URL='https://eshopbackend-nrdd.onrender.com/api/'

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.BASE_URL}getorders`)
  }
  createOrder(order:Order): Observable<Order[]>{
    return this.http.post<Order[]>(`${this.BASE_URL}createorder` ,order)

  }
  deleteOrder(orderId:string): Observable<Order>{
    return this.http.delete<Order>(`${this.BASE_URL}deleteorder/${orderId}`)
  }
  getOrder(categoryId:string): Observable<Order>{
    return this.http.get<Order>(`${this.BASE_URL}getorder/${categoryId}`)
  }
  updateOrder(categoryId:string, order:Order): Observable<Order>{
    return this.http.put<Order>(`${this.BASE_URL}updateorder/${categoryId}`, order)
  }

  getProduct(productId:string):Observable<any>{
    return this.http.get<any>(`${this.BASE_URL}getproduct/${productId}`)
  }


}
