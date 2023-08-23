import { RouterModule, Routes } from "@angular/router";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { CategoriesComponent } from "./pages/categories/categories/categories.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { OrderDetailComponent } from "./pages/orders/order-detail/order-detail.component";
import { OrdersFormComponent } from "./pages/orders/orders-form/orders-form.component";
import { OrdersComponent } from "./pages/orders/orders.component";
import { ProductsFormComponent } from "./pages/products/products-form/products-form.component";
import { ProductsComponent } from "./pages/products/products.component";
import { UsersFormComponent } from "./pages/users/users-form/users-form.component";
import { UsersComponent } from "./pages/users/users.component";
import { ShellComponent } from "./shared/shell/shell.component";
import { NgModule } from "@angular/core";
import { AuthGuard, UsersModule } from "@eshop/users";


const appRoutes : Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate:[AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/form', component: ProductsFormComponent },
      { path: 'products/form/:id', component: ProductsFormComponent },

      { path: 'orders', component: OrdersComponent },
      { path: 'orders/form', component: OrdersFormComponent },
      { path: 'orders/form/:id', component: OrdersFormComponent },
      { path: 'orders/:id', component: OrderDetailComponent },

      { path: 'users', component: UsersComponent },
      { path: 'users/form', component: UsersFormComponent },
      { path: 'users/form/:id', component: UsersFormComponent },

      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/form', component: CategoriesFormComponent },
      { path: 'categories/form/:id', component: CategoriesFormComponent },
    ],
  },
  {
    path: '**',
    redirectTo:'',
    pathMatch:'full'
  }
];



@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,{ initialNavigation: 'enabledBlocking' },),
    UsersModule
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
