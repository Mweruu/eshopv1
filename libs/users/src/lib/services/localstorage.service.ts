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

  isValidToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp)
    }else{
      return false;
    }
  }

  getUserIdFromToken(){
    const token = this.getToken();
    if(token){
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if(tokenDecode){
      return tokenDecode.userId;
      }else{
        return null;
      }
    }else{
      return null;
    }
  }

  private _tokenExpired(expiration: number):boolean{
    return Math.floor(new Date().getTime()/1000) >= expiration
  }


}
