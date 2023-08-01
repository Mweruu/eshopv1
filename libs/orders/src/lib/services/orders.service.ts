import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]>{
    return this.http.get<Order[]>('http://localhost:3000/api/getorders')
  }
  createOrders(order:Order): Observable<Order[]>{
    return this.http.post<Order[]>('http://localhost:3000/api/createorder' ,order)

  }
}
