import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products:Product[] = [];
  // BASE_URL='http://localhost:3000/api/';
  BASE_URL='https://eshopbackend-nrdd.onrender.com/api/'


  constructor(private http:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}getproducts`)
  }

  createProducts(product:FormData):Observable<Product>{
    return this.http.post<Product>(`${this.BASE_URL}createproducts`, product)
  }

  deleteProduct(productId:string): Observable<Product>{
    return this.http.delete<Product>(`${this.BASE_URL}deleteproduct/${productId}`)
  }

  getProduct(productId:string):Observable<Product>{
    return this.http.get<Product>(`${this.BASE_URL}getproduct/${productId}`)
  }

  getProductbycatId(categoryId:string[]):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.BASE_URL}getproducts/${categoryId}`)
  }

  updateProduct(productId:string ,product:FormData):Observable<Product>{
    return this.http.put<Product>(`${this.BASE_URL}updateproduct/${productId}`, product)
  }
}
