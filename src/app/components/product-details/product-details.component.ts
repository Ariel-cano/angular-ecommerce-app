import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {cart, Product} from '../../models/data-types';
import {NgIf} from '@angular/common';
import {faCartShopping, faTag, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productData : undefined | Product;
  productQuantity: number = 1;
  removeCart = false;
  cartData: Product | undefined;
  discountIcon = faTag;
  trashIcon = faTrash;
  cartIcon = faCartShopping;
  constructor(private activatedRoute: ActivatedRoute, private productSrc: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(() => {
      let productId = this.activatedRoute.snapshot.paramMap.get('productId');
      if (!productId) return;

      this.productSrc.getProductById(productId).subscribe((data) => {
        this.productData = data;
        this.removeCart = false;

        let user = localStorage.getItem('user');
        if (user) {
          let userId = JSON.parse(user).id;
          this.productSrc.getCartList(userId);
          this.productSrc.cartInfo.subscribe((result) => {
            let item = result.filter(
              (item: Product) =>
                productId?.toString() === item.productId?.toString());
            if (item.length){
              this.cartData = item[0];
              this.removeCart = true;
            }
          });
        } else {
          let cartData = localStorage.getItem('localCart');
          if (cartData) {
            let items = JSON.parse(cartData);
            items = items.filter(
              (item: Product) => productId === item.id?.toString()
            );
            if (items.length){
              this.removeCart = true;
            }else{
              this.removeCart = false;
            }
          }
        }
      });
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
            this.productSrc.getCartList(userId);
            this.removeCart=true;
          }
        });
      }
    }
  }
  removeFromCart(productId: string){
    if (!localStorage.getItem('user')){
      this.productSrc.removeProductFromCart(productId);
      this.removeCart = false;
    }else{
      this.cartData && this.productSrc.removeToCart(this.cartData.id).subscribe((result)=>{
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productSrc.getCartList(userId);
      })
      this.removeCart = false;
    }

  }

}
