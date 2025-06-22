import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {cart, Product} from '../models/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';
  cartData = signal<number>(0)

  constructor(private http : HttpClient) { }

  addProduct(product: Product){
    return this.http.post(this.baseUrl, product);
  }

  getProductList() {
    return this.http.get<Product[]>(this.baseUrl);
  }

  deleteProductById(id: string){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProductById(id: string){
    return this.http.get<Product>(`${this.baseUrl}/${id}`)
  }

  updateProduct(product:Product){
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product)
  }

  popularProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}?_limit=4`);
  }

  getTrendyProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}?_limit=8`);
  }
  searchProduct(query: string){
    return this.http.get<Product[]>(`${this.baseUrl}?q=${query}`)
  }

  localAddToCart(data: Product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart){
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.set(1);
    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.set(cartData.length);
    }
  }

  removeProductFromCart(productId: string){
    let cartData = localStorage.getItem('localCart');
    if (cartData){
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product)=>{
        return productId !== item.id
      });
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.set(items.length);
    }
  }

  addToCart(cardData : cart){
    return this.http.post('http://localhost:3000/cart', cardData);
  }


}
