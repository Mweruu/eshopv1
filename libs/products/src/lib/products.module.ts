import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { CategoriesBannerComponent } from './components/categories-banner/categories-banner.component';
import { CategoriesService } from './services/categories.service';
import { OrdersModule } from '@eshop/orders';
import { RouterModule, Routes } from '@angular/router';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ButtonModule } from 'primeng/button';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { UiModule } from '@eshop/ui';

export const routes: Routes = [
  { path: 'products', component: ProductsListComponent },
  { path: 'category/:categoryid', component: ProductsListComponent },
  { path: 'products/:productid', component: ProductPageComponent },

];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    OrdersModule,
    RouterModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    RatingModule,
    DividerModule,
    InputNumberModule,
    UiModule,
  ],
  declarations: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
  providers: [CategoriesService],
  exports: [
    ProductSearchComponent,
    CategoriesBannerComponent,
    FeaturedProductsComponent,
    ProductItemComponent,
    ProductsListComponent,
    ProductPageComponent,
  ],
})
export class ProductsModule {}
