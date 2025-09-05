import {Component, effect, OnInit} from '@angular/core';
import {
  faInfoCircle,
  faTag,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {favorite, Product} from '../../models/data-types';
import {FavoriteService} from '../../services/favorite.service';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {ProductService} from '../../services/product.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FaIconComponent,
    NgIf,
    DatePipe
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  protected readonly trashIcon = faTrash;
  protected readonly discountIcon = faTag;
  protected readonly infoIcon = faInfoCircle;

  favorites: favorite[] = [];
  products: Product[] = [];

  constructor(private favoriteService: FavoriteService, private router: Router, private productService: ProductService) {
    effect(() => {
      if(this.favoriteService.favoriteData() === 0){
        this.router.navigate(['/']);
      }
    });
  }

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    const userId = this.getUserId();
    if (userId) {
      this.favoriteService.getFavoritesByUserId(userId).subscribe({
        next: (favorites) => {
          this.favorites = favorites;
          const productIds = favorites.map(fav => fav.productId);

          this.productService.getProductsByIds(productIds).subscribe({
            next: (products) => {
              this.products = products;
              this.favoriteService.favoriteData.set(products.length);
            },
            error: (err) => alert(`Error in loading products: ${err}`)
          });
        },
        error: (err) => alert(`Error in loading favorites: ${err}`)
      });
    }
  }

  removeFromFavorites(productId: string): void {
    const favoriteId = this.getFavoriteId(productId);
    if (favoriteId) {
      this.favoriteService.removeFromFavorites(favoriteId).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
          this.products = this.products.filter(prod => prod.id !== productId);
          this.favoriteService.favoriteData.set(this.products.length);
        },
        error: (err) => alert(`Error in removing from favorites: ${err}`)
      });
    }
  }

  getAddedTime(productId: string): string | null {
    const favorite = this.favorites.find(f => f.productId === productId);
    return favorite?.addedAt || null;
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  getFavoriteId(productId: string): string | undefined {
    const favorite = this.favorites.find(f => f.productId === productId);
    return favorite?.id;
  }

}
