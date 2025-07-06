import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { ProductService } from '../../services/product.service';
import { cart, Product } from '../../models/data-types';
import { Subscription } from 'rxjs';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {NgForOf, NgIf} from '@angular/common';
import {faCartShopping, faTag, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [
    RouterLink,
    NgbCarousel,
    NgIf,
    NgbSlide,
    NgForOf,
    FaIconComponent
  ],
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  popularProducts: Product[] = [];
  trendyProducts: Product[] = [];
  removeCart: { [productId: string]: boolean } = {};
  cartData: { [productId: string]: Product | undefined } = {};
  private cartSub?: Subscription;
  discountIcon = faTag;
  shoppingIcon = faCartShopping;
  trashIcon = faTrash;

  constructor(
    private productSrc: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.productSrc.popularProducts().subscribe((products) => {
      this.popularProducts = products || [];
      this.updateCartStates();
    });
    this.productSrc.getTrendyProducts().subscribe((products) => {
      this.trendyProducts = products || [];
      this.updateCartStates();
    });

    if (this.isUserLoggedIn()) {
      const userId = this.getUserId();
      if (userId) {
        this.productSrc.getCartList(userId);
        this.cartSub = this.productSrc.cartInfo.subscribe((cartList: Product[]) => {
          (this.productSrc as any).currentCartList = cartList;
          this.updateCartStates();
        });
      }
    }
    this.cartSub = this.productSrc.cartInfo.subscribe(() => {
      this.updateCartStates();
    });
  }

  ngOnDestroy() {
    this.cartSub?.unsubscribe();
  }

  private updateCartStates() {
    const allProducts = [
      ...(this.popularProducts || []),
      ...(this.trendyProducts || [])
    ];

    if (this.isUserLoggedIn()) {
      const cartList: Product[] = (this.productSrc as any).currentCartList || [];
      allProducts.forEach(product => {
        const item = cartList.find(i => product.id?.toString() === i.productId?.toString());
        this.cartData[product.id!] = item;
        this.removeCart[product.id!] = !!item;
      });
    } else {
      const cartDataLocal = localStorage.getItem('localCart');
      const items = cartDataLocal ? JSON.parse(cartDataLocal) : [];
      allProducts.forEach(product => {
        const item = items.find((i: { id: { toString: () => string; }; }) => product.id?.toString() === i.id?.toString());
        this.cartData[product.id!] = item;
        this.removeCart[product.id!] = !!item;
      });
    }
  }

  addToCart(product: Product) {
    if (!product) return;
    if (this.isUserLoggedIn()) {
      const userId = this.getUserId();
      if (!userId) return;

      const cartList: Product[] = (this.productSrc as any).currentCartList || [];
      const item = cartList.find(i => product.id?.toString() === i.productId?.toString());
      if (item) return;

      const cartItem: cart = {
        ...product,
        productId: product.id,
        userId,
        quantity: 1
      };
      delete cartItem.id;
      this.productSrc.addToCart(cartItem).subscribe(() => {
        this.productSrc.getCartList(userId);
      });
    } else {
      product.quantity = 1;
      this.productSrc.localAddToCart(product);
      this.updateCartStates();
      alert('to go to the shopping cart, log in or register');
      this.router.navigate(['/user-auth']);
    }
  }

  removeFromCart(product: Product) {
    if (!product) return;

    if (this.isUserLoggedIn()) {
      const cartItem = this.cartData[product.id!];
      if (cartItem && cartItem.id) {
        this.productSrc.removeToCart(cartItem.id).subscribe(() => {
          const userId = this.getUserId();
          if (userId) {
            this.productSrc.getCartList(userId);
          }
        });
      }
    } else {
      this.productSrc.removeProductFromCart(product.id);
      setTimeout(() => this.updateCartStates(), 10);
    }
  }


  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  protected readonly cartIcon = faCartShopping;
}
