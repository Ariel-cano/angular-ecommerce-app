import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {SellerAuthComponent} from './components/seller-auth/seller-auth.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SellerHomeComponent} from './components/seller-home/seller-home.component';
import {authGuard} from './guards/auth.guard';
import {SellerAddProductComponent} from './components/seller-add-product/seller-add-product.component';
import {SellerUpdateProductComponent} from './components/seller-update-product/seller-update-product.component';
import {SearchComponent} from './components/search/search.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {UserAuthComponent} from './components/user-auth/user-auth.component';
import {CartPageComponent} from './components/cart-page/cart-page.component';
import {CheckoutComponent} from './components/checkout/checkout.component';
import {MyOrdersComponent} from './components/my-orders/my-orders.component';
import {FavoritesComponent} from './components/favorites/favorites.component';

export const routes: Routes = [
  {component: HomeComponent, path: ''},
  {component: SellerAuthComponent, path: 'seller-auth'},
  {component: SellerHomeComponent, path: 'seller-home', canActivate: [authGuard]},
  {component: SellerAddProductComponent, path: 'seller-add-product', canActivate: [authGuard]},
  {component: SellerUpdateProductComponent, path: 'seller-update-product/:id', canActivate: [authGuard]},
  {component: SearchComponent, path: 'search/:query'},
  {component: ProductDetailsComponent, path: 'details/:productId'},
  {component: UserAuthComponent, path: 'user-auth'},
  {component: CartPageComponent, path:'cart-page'},
  {component: CheckoutComponent, path: 'checkout'},
  {component: MyOrdersComponent, path: 'my-orders'},
  {component: FavoritesComponent, path: 'favorites'},
  {component: NotFoundComponent, path: '**'},
];
