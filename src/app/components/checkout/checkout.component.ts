import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {cart, contactData, order} from '../../models/data-types';
import {Router} from '@angular/router';
import {EmailValidationDirective} from '../../directives/email-validation.directive';
import {NgIf, NgStyle} from '@angular/common';
import {PhoneValidationDirective} from '../../directives/phone-validation.directive';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule,
    EmailValidationDirective,
    NgIf,
    NgStyle,
    PhoneValidationDirective
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  constructor(private productSrc: ProductService, private router: Router) {
  }
  cartData: cart[] | undefined;
  totalPrice: number | undefined;
  orderMsg: string | undefined;
  orderNow(data: contactData){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice){
      let orderData : order={
        ...data,
        totalPrice:this.totalPrice,
        userId,
        id: undefined,
        date: new Date()
      }
      this.cartData?.forEach((item)=>{
        setTimeout(()=>{
          item.id && this.productSrc.deleteCartItems(item.id);
        },600)
      })
      this.productSrc.orderNow(orderData).subscribe((result)=>{
        if (result){
          this.orderMsg="Order has been placed"
          setTimeout(()=>{
            this.orderMsg = undefined;
            this.router.navigate(['/my-orders']);
          },3000)
        }
      })
    }
  }

  ngOnInit() {
    this.productSrc.currentCart().subscribe((result)=>{
      if (result){
        let price: number = 0;
        this.cartData = result;
        result.forEach((item)=> {
          if (item.quantity) {
            price = +price + (+item.price * +item.quantity)
          }
        })
        this.totalPrice = Math.round((price)+((price/100)*6)+100-(price/15));
        if (this.totalPrice === 100){
          this.router.navigate(['/']);
        }
      }
    })
  }
}
