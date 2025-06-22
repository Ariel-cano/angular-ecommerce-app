import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {cart, Product} from '../../models/data-types';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productData : undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  constructor(private activatedRoute: ActivatedRoute, private productSrc: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      let productId = this.activatedRoute.snapshot.paramMap.get('productId');
      productId && this.productSrc.getProductById(productId).subscribe((data)=>{
        this.productData = data;
        let cartData = localStorage.getItem('localCart')
        if (productId && cartData){
          let items = JSON.parse(cartData);
          items = items.filter((item : Product)=>{
            return productId === item.id.toString();
          });
          this.removeCart = !!items.length;
        }
      })
    });
  }

  handleQuantity(value : string){
    if (this.productQuantity < 20 && value === 'plus'){
      this.productQuantity +=1;
    } else if (this.productQuantity > 1 && value === 'min'){
      this.productQuantity -=1;
    }
  }

  addToCart(){
    if (this.productData){
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')){
        this.productSrc.localAddToCart(this.productData);
        this.removeCart = true;
      }else{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cardData : cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cardData.id;
        this.productSrc.addToCart(cardData).subscribe((result)=>{
          if (result){
            alert('Product is added in the cart');
          }
        });
      }
    }
  }
  removeFromCart(productId: string){
    this.productSrc.removeProductFromCart(productId);
    this.removeCart = false;
  }


}
