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
}
