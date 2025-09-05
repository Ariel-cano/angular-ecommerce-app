import {Component, effect, OnDestroy, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from 'rxjs';
import {Product} from '../../models/data-types';
import {ProductService} from '../../services/product.service';
import {FormsModule} from '@angular/forms';
import {faMoneyCheckDollar} from '@fortawesome/free-solid-svg-icons/faMoneyCheckDollar';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faHouse} from '@fortawesome/free-solid-svg-icons/faHouse';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {faRightFromBracket} from '@fortawesome/free-solid-svg-icons/faRightFromBracket';
import {faBoxesStacked} from '@fortawesome/free-solid-svg-icons/faBoxesStacked';
import {faCartShopping, faHeart, faList, faPlus, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import {FavoriteService} from '../../services/favorite.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgSwitch,
    NgSwitchCase,
    TitleCasePipe,
    FormsModule,
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy{

  filteredProducts: Product[] | undefined;
  allProducts: Product[] = [];
  searchTerm: string = '';
  searchTerms: Subject<string> = new Subject<string>();
  searchSubscription?: Subscription;
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  productId : string | null = null;
  sellerIcon = faMoneyCheckDollar;
  houseIcon = faHouse;
  userIcon = faUser;
  logoutIcon = faRightFromBracket;
  myOrdersIcon = faBoxesStacked;
  cartIcon = faCartShopping;
  listIcon = faList;
  addProductIcon = faPlus;
  signUpIcon = faUserPlus;
  favoriteIcon = faHeart;
  userId: string | null = null;

  constructor(private route: Router, protected productSrc:ProductService, protected favoriteSrc: FavoriteService) {
    effect(() => {
      this.productSrc.cartData();
      this.favoriteSrc.favoriteData();
    });
  }

  ngOnInit() {
    this.selectMenuType();
    this.searchSubscription = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.searchTerm = term;
        return this.productSrc.getProductList();
      })
    ).subscribe({
      next: products => {
        this.allProducts = products;
        this.filterProducts();
      },
      error: error => {
        console.error('Error by search products', error);
      }
    });
    let cartData = localStorage.getItem('localCart');
    if (cartData){
      this.productSrc.cartData.set((JSON.parse(cartData)).length);
    }
    this.userId = this.getUserId();
    if (this.userId) {
      this.favoriteSrc.loadFavoritesCount(this.userId)
    }
  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
  }

  private getUserId(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).id : null;
  }

  filterProducts() {
    if (!this.searchTerm) {
      this.filteredProducts = this.allProducts.slice(0,5);
    } else {
      this.filteredProducts = this.allProducts.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.price.toString().toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).slice(0,5);
    }
  }
  pleaseReg(){
    alert('to access the shopping cart, log in or register');
  }
  hideSearch(){
    this.filteredProducts = undefined;
  }
  submitSearch(value: string){
    if(value){
      this.route.navigate([`search/${value}`]);
    }
  }

  selectMenuType(){
    this.route.events.subscribe((val: any) => {
        if (val.url) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore = localStorage.getItem('seller');
            let sellerData = (sellerStore && JSON.parse(sellerStore)[0]) || (sellerStore && JSON.parse(sellerStore));
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
            this.productSrc.getCartList(userData.id);
          }
          else {
            this.menuType = 'default';
          }
        }
      }
    );
  }
  redirectToDetails(id: string){
    this.route.navigate([`/details/${id}`]);
  }
  userlogout(){
    localStorage.removeItem('user');
    this.route.navigate(['/user-auth']);
    this.productSrc.cartData.set(0);


  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe()
  }



}
