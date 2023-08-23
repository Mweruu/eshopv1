import { Component } from '@angular/core';
import { LocalstorageService } from '@eshop/users';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  constructor(private localStorage:LocalstorageService){}

  logOut(){
    this.localStorage.removeToken()
  }
}
