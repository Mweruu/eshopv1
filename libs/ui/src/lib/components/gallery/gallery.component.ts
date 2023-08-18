import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'eshop-ui-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit{
  selectedImage!:string
  //  = 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg';

  @Input()
  images: string[] = [
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',
    // 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',
    // 'https://cdn.britannica.com/77/170477-050-1C747EE3/Laptop-computer.jpg',
    // 'https://achs.edu/wp-content/uploads/2021/03/26749024_ml.jpg',

  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(){}

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
