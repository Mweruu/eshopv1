import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  apiUrl='http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>(`${this.apiUrl}getorders`)
  }
  createOrders(order:Order): Observable<Order[]>{
    return this.http.post<Order[]>(`${this.apiUrl}createorder` ,order)

  }
  deleteOrder(orderId:string): Observable<Order>{
    return this.http.delete<Order>(`${this.apiUrl}deleteorder/${orderId}`)
  }
  getOrder(categoryId:string): Observable<Order>{
    return this.http.get<Order>(`${this.apiUrl}getorder/${categoryId}`)
  }
  updateOrder(categoryId:string, order:Order): Observable<Order>{
    return this.http.put<Order>(`${this.apiUrl}updateorder/${categoryId}`, order)
  }
}
