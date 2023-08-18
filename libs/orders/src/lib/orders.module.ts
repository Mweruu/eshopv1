import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [CommonModule],
})
export class OrdersModule {
  constructor(private http:HttpClient){}

  getOrders(){
    return this.http.get('http://localhost:3000/api/getorders')
  }
}
