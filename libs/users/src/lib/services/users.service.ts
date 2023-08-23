import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';


declare const require: (arg0: string) => countriesLib.LocaleData;


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  apiUrl='http://localhost:3000/api/';

  constructor(private http: HttpClient) {}

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}getusers`)
  }

  createUsers(user:User):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}createuser`, user)
  }

  deleteUser(userId:string): Observable<User>{
    return this.http.delete<User>(`${this.apiUrl}deleteuser/${userId}`)
  }

  getUser(userId:string):Observable<User>{
    return this.http.get<User>(`${this.apiUrl}getuser/${userId}`)
  }
  updateUser(userId:string, user:User):Observable<User>{
    return this.http.put<User>(`${this.apiUrl}updateuser/${userId}`,user)
  }

  getCountries(){
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
    console.log(countriesLib.getNames("en", {select: "official"})); // { 'AF': 'Afghanistan', 'AL': 'Albania', [...], 'ZM': 'Zambia', 'ZW': 'Zimbabwe' }
    return Object.entries(countriesLib.getNames("en", {select: "official"})).map((entry) => {
      return{
        id:entry[0],
        name:entry[1]
      }
    })
  }
}
