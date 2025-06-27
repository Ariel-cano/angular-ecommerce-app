import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {contactData, order} from '../../models/data-types';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit{
  constructor(private productSrc: ProductService) {
  }
  totalPrice: number | undefined;
  orderNow(data: contactData){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice){
      let orderData : order={
        ...data,
        totalPrice:this.totalPrice,
        userId
      }
      this.productSrc.orderNow(orderData).subscribe((result)=>{
        if (result){
          alert('order placed');
        }
      })
    }
  }

  ngOnInit() {
    this.productSrc.currentCart().subscribe((result)=>{
      if (result){
        let price: number = 0;
        result.forEach((item)=> {
          if (item.quantity) {
            price = +price + (+item.price * +item.quantity)
          }
        })
        this.totalPrice = Math.round((price)+(price/10)+100-(price/15));
      }
    })
  }
}
