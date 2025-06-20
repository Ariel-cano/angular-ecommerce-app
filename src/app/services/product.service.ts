import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/data-types';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = 'http://localhost:3000/products'

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


}
