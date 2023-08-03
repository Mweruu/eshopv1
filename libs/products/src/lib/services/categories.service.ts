import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  apiUrl='http://localhost:3000/api/'

  constructor(private http:HttpClient) { }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(`${this.apiUrl}getcategories`)
  }

  createCategories(category: Category):Observable<Category>{
    return this.http.post<Category>(`${this.apiUrl}createcategory`, category)
  }

  deleteCategory(categoryId:string): Observable<Category>{
    return this.http.delete<Category>(`${this.apiUrl}deletecategory/${categoryId}`)
  }

  updateCategory(categoryId:string, category:Category): Observable<Category>{
    return this.http.put<Category>(`${this.apiUrl}updatecategory/${categoryId}`, category)
  }

  getCategory(categoryId:string): Observable<Category>{
    return this.http.get<Category>(`${this.apiUrl}getcategory/${categoryId}`)
  }
}
