import {Component, OnInit} from '@angular/core';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../services/product.service';
import {cart, Product} from '../../models/data-types';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {of, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgbCarousel,
    NgbSlide,
    NgForOf,
    RouterLink,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];
  removeCart = false;


  constructor(private productSrc : ProductService, private router: Router) {
  }

  ngOnInit(){
    this.productSrc.popularProducts().subscribe((data)=>{
      this.popularProducts = data;
    });
    this.productSrc.getTrendyProducts().subscribe((data)=>{
      this.trendyProducts = data;
    })

  }


  addToCart(productId: string) {
    this.productSrc.getProductById(productId)
      .pipe(
        switchMap((product) => {
          if (!product) return of(null);

          product.quantity = 1;
          if (this.isUserLoggedIn()) {
            return this.handleAddToUserCart(product);
          } else {
            this.handleAddToLocalCart(product);
            return of(null);
          }
        }),
        tap(() =>{
          if (this.isUserLoggedIn()){
            this.router.navigate(['/cart-page']);
          }else{
            this.router.navigate(['/user-auth']);
            alert('to go to the shopping cart, log in or register')
          }
        })
      )
      .subscribe();
  }

  private isUserLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  private handleAddToLocalCart(product: Product) {
    this.productSrc.localAddToCart(product);
    this.removeCart = true;
  }

  private handleAddToUserCart(product: Product) {
    const userId = this.getUserId();
    if (!userId) return of(null);

    const cartItem: cart = {
      ...product,
      productId: product.id,
      userId
    };
    delete cartItem.id;

    return this.productSrc.addToCart(cartItem).pipe(
      tap((result) => {
        if (result) {
          this.productSrc.getCartList(userId);
          this.removeCart = true;
        }
      })
    );
  }



}
