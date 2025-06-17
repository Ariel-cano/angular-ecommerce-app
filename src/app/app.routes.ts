import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SellerAuthComponent} from './components/seller-auth/seller-auth.component';
import {NotFoundComponent} from './components/not-found/not-found.component';

export const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: SellerAuthComponent, path: 'seller-auth'},
  {component: NotFoundComponent, path: '**'}
];
