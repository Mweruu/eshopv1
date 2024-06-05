import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  uploadPictureData: any;

  // constructor() { }
  //assign uploadPictureData
  setuploadPictureData(data: any){
    this.uploadPictureData = data;
  }
  //To get uploadPictureData
  getuploadPictureData(){
    return this.uploadPictureData ;
  }

}
