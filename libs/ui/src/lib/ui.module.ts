import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';

import { SplitButtonModule } from 'primeng/splitbutton';
import { ButtonModule } from 'primeng/button';
import { GalleryComponent } from './components/gallery/gallery.component';

@NgModule({
  imports: [CommonModule, SplitButtonModule, ButtonModule],
  declarations: [BannerComponent, GalleryComponent],
  exports: [BannerComponent,GalleryComponent],
})
export class UiModule {}
