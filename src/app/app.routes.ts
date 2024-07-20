import { Routes } from '@angular/router';
import { MainLayoutComponent } from './modules/core/theme/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children:[
      {
        path:'',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      },

    ]
  }
];
