import { Injectable } from '@angular/core';

const TOKEN = 'jwtToken'
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  isAdmin!: string | null;
  userToken!: string | null;


  setToken(data: any){
    console.log('auth',data);
    localStorage.setItem(TOKEN, data)
  }

  getToken(){
    this.userToken = localStorage.getItem(TOKEN)

    return localStorage.getItem(TOKEN)
  }

  removeToken(){
    return localStorage.removeItem(TOKEN)
  }
}
