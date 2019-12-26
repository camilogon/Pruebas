import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './pages/client/client.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductsComponent } from './pages/products/products.component';
import { OrderComponent } from './pages/order/order.component';
import { OrdersComponent } from './pages/orders/orders.component';



const ROUTE:Routes=[
  {path: 'clients',component:ClientsComponent },
  {path: 'client/:id',component:ClientComponent},
  {path: 'categories',component:CategoriesComponent },
  {path: 'category/:id',component:CategoryComponent},
  {path: 'products',component:ProductsComponent },
  {path: 'product/:id',component:ProductComponent},
  {path: 'orders',component:OrdersComponent },
  {path: 'order',component:OrderComponent},
  {path: '**',pathMatch:'full',redirectTo:'heroes'}
];


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(ROUTE),
            CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
