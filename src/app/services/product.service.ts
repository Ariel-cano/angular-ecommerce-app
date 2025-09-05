import {EventEmitter, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {cart, order, Product} from '../models/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products';
  cartData = signal<number>(0);
  cartInfo = new EventEmitter<Product[] | []>()

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
    return this.http.get<Product[]>(`${this.baseUrl}?_limit=5`);
  }
  getProductsByIds(ids: string[]) {
    return this.http.get<Product[]>(`${this.baseUrl}?id=${ids.join('&id=')}`);
  }

  getTrendyProducts(){
    return this.http.get<Product[]>(`${this.baseUrl}?_limit=16`);
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
      this.cartInfo.emit(cartData)
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
      this.cartInfo.emit(items);
    }
  }

  addToCart(cardData : cart){
    return this.http.post('http://localhost:3000/cart', cardData);
  }

  getCartList(userId : string){
    return this.http.get<Product[]>(`http://localhost:3000/cart?userId=`+userId, {observe:"response"}).subscribe((result)=>{
      if(result && result.body){
        this.cartData.set(result.body.length);
        this.cartInfo.emit(result.body)
      }
    });
  }

  removeToCart(cartId: string){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`);
  }

  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+ userData.id);
  }

  orderNow(data: order){
    return this.http.post(`http://localhost:3000/orders`,data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId='+ userData.id);
  }
  deleteCartItems(cartId: string){
    return this.http.delete(`http://localhost:3000/cart/${cartId}`).subscribe(()=>{
      this.cartInfo.emit([]);
      this.cartData.set(0);
    });
  }

  cancelOrder(orderId: string){
    return this.http.delete(`http://localhost:3000/orders/${orderId}`)
  }


}
