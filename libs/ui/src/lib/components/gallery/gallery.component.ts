import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit{
  selectedImage!:string
  @Input()
  images: string[] = [];


  ngOnInit(): void {
    if(this.hasImages){
      this.selectedImage = this.images[0]
    }
  }

  changeSelectedImage(imageUrl:string){
    this.selectedImage = imageUrl
  }

  get hasImages(){
    return this.images?.length > 0;
  }
}
