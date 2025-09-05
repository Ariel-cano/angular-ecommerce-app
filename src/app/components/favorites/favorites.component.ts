import {Component, effect, OnInit} from '@angular/core';
import {
  faInfoCircle,
  faTag,
  faTrash
} from "@fortawesome/free-solid-svg-icons";
import {favorite} from '../../models/data-types';
import {FavoriteService} from '../../services/favorite.service';
import {NgForOf, NgIf} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FaIconComponent,
    NgIf
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit {
  protected readonly trashIcon = faTrash;
  protected readonly discountIcon = faTag;
  protected readonly infoIcon = faInfoCircle;

  favorites: favorite[] = [];

  constructor(private favoriteService: FavoriteService, private router: Router) {
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
    if (userId){
      this.favoriteService.getFavoritesByUserId(userId).subscribe((favorites) => {
        this.favorites = favorites;
      });
    }
  }

  removeFromFavorites(item: favorite): void {
    const favoriteId = item.id;
    const userId = this.getUserId();
    if (favoriteId && userId) {
      this.favoriteService.removeFromFavorites(favoriteId).subscribe(() => {
        this.loadFavorites();
        this.favoriteService.loadFavoritesCount(userId);
      });
    }
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

}
