import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {cart, priceSummary} from '../../models/data-types';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit{
  cartData : cart[] | undefined;
  priceSummary : priceSummary = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }
  constructor(private productSrc:ProductService, private router: Router) {
  }
  ngOnInit() {
    this.productSrc.currentCart().subscribe((result)=>{
      if (result){
        this.cartData = result;
        let price: number = 0;
        result.forEach((item)=> {
          if (item.quantity) {
            price = +price + (+item.price * +item.quantity)
          }
        })
        this.priceSummary.price = Math.round(price);
        this.priceSummary.discount = Math.round(price / 15);
        this.priceSummary.tax = Math.round(price / 10);
        this.priceSummary.delivery = 100;
        let total: number = 0;
        for (let sum of Object.values(this.priceSummary)){
          if (sum != this.priceSummary.discount){
            total += +sum;
          }else{
            total -= +sum;
          }
        }
        this.priceSummary.total = Math.round(total);

      }
    })
  }
  checkout(){
    this.router.navigate(['/checkout']);
  }


}
