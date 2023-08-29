import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
// import { appRoutes } from './app.routes';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavComponent } from './shared/nav/nav.component';
import { ProductsModule } from '@eshop/products';
import { UiModule } from '@eshop/ui';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { OrdersModule } from '@eshop/orders';
import { UsersModule } from '@eshop/users';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

export const appRoutes : Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent,
    NxWelcomeComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    ProductsModule,
    UiModule,
    BrowserAnimationsModule,
    OrdersModule,
    UsersModule,

  ],
  providers: [
    MessageService,
    ConfirmationService,
    // {provide: HTTP_INTERCEPTORS, useClass:JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
