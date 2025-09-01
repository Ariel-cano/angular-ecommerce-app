import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {favorite} from '../models/data-types';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private apiUrl = 'http://localhost:3000/favorites';
  favoriteData = signal<number>(0)

  constructor(private http : HttpClient) { }

  getFavoritesByUserId(userId: string): Observable<favorite[]> {
    return this.http.get<favorite[]>(`${this.apiUrl}?userId=${userId}`);
  }

  loadFavoritesCount(userId: string): void {
    this.getFavoritesByUserId(userId).subscribe(favorites => {
      this.favoriteData.set(favorites.length);
    });
  }

  addToFavorites(favorite: favorite): Observable<favorite> {
    return this.http.post<favorite>(this.apiUrl, favorite).pipe(
      tap(() => this.favoriteData.update(value => value + 1))
    );
  }

  removeFromFavorites(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.favoriteData.update(value => value - 1))
    );
  }
}
