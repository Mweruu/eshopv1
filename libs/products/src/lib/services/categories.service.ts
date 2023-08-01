import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http:HttpClient) { }

  getCategories(): Observable<[]>{
    return this.http.get<[]>('http://localhost:3000/api/getcategories')
  }

  createCategories(category: Category):Observable<Category>{
    return this.http.post<Category>('http://localhost:3000/api/createcategory', category)
  }
}
