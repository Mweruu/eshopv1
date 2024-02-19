import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  BASE_URL='https://eshopbackend-nrdd.onrender.com/api/'


  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.BASE_URL}getcategories`)
  }

  createCategories(category: Category):Observable<Category>{
    return this.http.post<Category>(`${this.BASE_URL}createcategory`, category)
  }

  deleteCategory(categoryId:string): Observable<Category>{
    return this.http.delete<Category>(`${this.BASE_URL}deletecategory/${categoryId}`)
  }

  updateCategory(categoryId:string, category:Category): Observable<Category>{
    return this.http.put<Category>(`${this.BASE_URL}updatecategory/${categoryId}`, category)
  }

  getCategory(categoryId:string): Observable<Category>{
    return this.http.get<Category>(`${this.BASE_URL}getcategory/${categoryId}`)
  }
}
