import { Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/core/theme/main-layout/main-layout.component';
import { AuthGuard } from './modules/core/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },
    ],

  },
  {
    path: 'login',
    loadComponent: () => import('./modules/core/theme/login-page/login-page.component').then((m) => m.LoginPageComponent),
  }
];

// canActivate: [AuthGuard],
