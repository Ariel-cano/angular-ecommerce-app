import {Component, OnDestroy, OnInit, signal} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgForOf, NgIf, NgSwitch, NgSwitchCase, TitleCasePipe} from '@angular/common';
import {debounceTime, distinctUntilChanged, Subject, Subscription, switchMap} from 'rxjs';
import {Product} from '../../models/data-types';
import {ProductService} from '../../services/product.service';
import {FormsModule} from '@angular/forms';


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
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
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
  productId : string | null = null

  constructor(private route: Router, protected productSrc:ProductService) {

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
    let carData = localStorage.getItem('localCart');
    if (carData){
      this.productSrc.cartData.set((JSON.parse(carData)).length);
    }

  }

  logout() {
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
    this.productSrc.cartInfo.emit([]);
    this.productSrc.cartData.set(0);
  }

  onSearch(term: string) {
    this.searchTerms.next(term);
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
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
            this.menuType = 'seller';
          }else if(localStorage.getItem('user')){
            let userStore = localStorage.getItem('user');
            let userData = userStore && JSON.parse(userStore);
            this.userName = userData.name;
            this.menuType = 'user';
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
  }

  ngOnDestroy() {
    this.searchSubscription?.unsubscribe()
  }



}
