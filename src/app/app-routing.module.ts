import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'products',
        loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule),
        canActivate: [AuthGuard]
  },
  { path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule),
    canActivate: [AuthGuard]
  },
  { path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'farmers',
    loadChildren: () => import('./farmers/farmers.module').then( m => m.FarmersPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'farmer',
    loadChildren: () => import('./farmer/farmer.module').then( m => m.FarmerPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'companies',
    loadChildren: () => import('./processingcompany/processingcompany.module').then( m => m.ProcessingcompanyPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyPageModule),
    canActivate: [AuthGuard]
  },
  { path: 'scanner',
    loadChildren: () => import('./qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'farmers',
    loadChildren: () => import('./farmers/farmers.module').then( m => m.FarmersPageModule)
  },
  {
    path: 'processingcompany',
    loadChildren: () => import('./processingcompany/processingcompany.module').then( m => m.ProcessingcompanyPageModule)
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then( m => m.ProductPageModule)
  },
  {
    path: 'farmer',
    loadChildren: () => import('./farmer/farmer.module').then( m => m.FarmerPageModule)
  },
  {
    path: 'company',
    loadChildren: () => import('./company/company.module').then( m => m.CompanyPageModule)
  },
  {
    path: 'qr-scanner',
    loadChildren: () => import('./qr-scanner/qr-scanner.module').then( m => m.QrScannerPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
