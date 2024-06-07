import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ShellComponent } from './shared/shell/shell.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { CategoriesComponent } from './pages/categories/categories/categories.component';
import { UsersComponent } from './pages/users/users.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesFormComponent } from './pages/categories/categories-form/categories-form.component';
import { OrdersFormComponent } from './pages/orders/orders-form/orders-form.component';
import { ProductsFormComponent } from './pages/products/products-form/products-form.component';
import { UsersFormComponent } from './pages/users/users-form/users-form.component';
import { OrderDetailComponent } from './pages/orders/order-detail/order-detail.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DropdownModule } from 'primeng/dropdown';
import { EditorModule } from 'primeng/editor';
import { TagModule } from 'primeng/tag';
import { InputMaskModule } from 'primeng/inputmask';
import { FieldsetModule } from 'primeng/fieldset';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UiModule } from '@eshop/ui';
import { FileUploadModule } from 'primeng/fileupload';
import { MenuModule } from 'primeng/menu';

const UX_MODULE = [
  CardModule,
  ToolbarModule,
  ButtonModule,
  TableModule,
  InputTextModule,
  ToastModule,
  ConfirmDialogModule,
  ColorPickerModule,
  InputSwitchModule,
  FileUploadModule,
  DropdownModule,
  EditorModule,
  TagModule,
  InputMaskModule,
  FieldsetModule,
  MenuModule
];

@NgModule({
  declarations: [
    AppComponent,
    ShellComponent,
    DashboardComponent,
    SidebarComponent,
    CategoriesComponent,
    UsersComponent,
    OrdersComponent,
    ProductsComponent,
    CategoriesFormComponent,
    OrdersFormComponent,
    ProductsFormComponent,
    UsersFormComponent,
    OrderDetailComponent,
    OrderDetailComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    ...UX_MODULE,
    UiModule
  ],
  providers: [
    MessageService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
