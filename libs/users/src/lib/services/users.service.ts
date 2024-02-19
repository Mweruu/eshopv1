import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/users';
import { Observable } from 'rxjs';
import * as countriesLib from 'i18n-iso-countries';
declare const require: (arg0: string) => countriesLib.LocaleData;
import { UsersFacade } from '../+state/users.facade';

// declare const require: (arg0: string) => countriesLib.LocaleData;
// const env = process.env['NODE_ENV'];
// const env = 'production'
// const LOCAL_BASE_URL = 'http://localhost:3000/api/';
// const PROD_BASE_URL = 'https://e-shop-backend2.netlify.app/api/';
// const PROD_BASE_URL = 'https://eshopbackend-nrdd.onrender.com/api/';
// let BASE_URL: string


// if(env === 'production'){
//   BASE_URL = PROD_BASE_URL;
// }else{
//   BASE_URL = LOCAL_BASE_URL;
// }
// console.log("environment", env)

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // BASE_URL='http://localhost:3000/api/';
  BASE_URL='https://eshopbackend-nrdd.onrender.com/api/'


  constructor(private http: HttpClient,
              private usersFacade:UsersFacade
    ) {
      countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
    }

  getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.BASE_URL}getusers`)
  }

  createUsers(user:User):Observable<User>{
    return this.http.post<User>(`${this.BASE_URL}createuser`, user)
  }

  deleteUser(userId:string): Observable<User>{
    return this.http.delete<User>(`${this.BASE_URL}deleteuser/${userId}`)
  }

  getUser(userId:string):Observable<User>{
    return this.http.get<User>(`${this.BASE_URL}getuser/${userId}`)
  }
  updateUser(userId:string, user:User):Observable<User>{
    return this.http.put<User>(`${this.BASE_URL}updateuser/${userId}`,user)
  }

  // getCountries(){
  //   console.log(countriesLib.getNames("en", {select: "official"})); // { 'AF': 'Afghanistan', 'AL': 'Albania', [...], 'ZM': 'Zambia', 'ZW': 'Zimbabwe' }
  //   return Object.entries(countriesLib.getNames("en", {select: "official"})).map((entry) => {
  //     return{
  //       id:entry[0],
  //       name:entry[1]
  //     }
  //   })
  // }

  getCountries(): { id: string; name: string }[] {
    return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
      return {
        id: entry[0],
        name: entry[1]
      };
    });
  }

  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }

  initAppSession(){
    this.usersFacade.buildUserSession();
  }

  observeCurrentUser(){
    return this.usersFacade.currentUser$;
  }

  isCurrentUserAuth(){
    return this.usersFacade.isAuthenticated$;
  }
}
