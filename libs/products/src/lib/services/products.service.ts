import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Product[] = [];

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>('http://localhost:3000/api/getproducts')
  }
  createProducts(product:Product):Observable<Product>{
    return this.http.post<Product>('http://localhost:3000/api/createproducts', product)
  }
}
