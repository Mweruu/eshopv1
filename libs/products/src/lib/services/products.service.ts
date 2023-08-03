import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Product[] = [];
  apiUrl='http://localhost:3000/api/';

  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.apiUrl}getproducts`)
  }
  createProducts(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.apiUrl}createproducts`, product)
  }

  deleteProduct(productId:string): Observable<Product>{
    return this.http.delete<Product>(`${this.apiUrl}deleteproduct/${productId}`)
  }
  getProduct(productId:string):Observable<Product>{
    return this.http.get<Product>(`${this.apiUrl}getproduct/${productId}`)
  }

  updateProduct(productId:string ,product:Product):Observable<Product>{
    return this.http.put<Product>(`${this.apiUrl}updateproduct/${productId}`, product)
  }
}
