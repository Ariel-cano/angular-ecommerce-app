import {Component, effect, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {cart, login, Product, signUp} from '../../models/data-types';
import {UserService} from '../../services/user.service';
import {NgIf, NgStyle} from '@angular/common';
import {ProductService} from '../../services/product.service';
import {NameValidationDirective} from '../../directives/name-validation.directive';
import {EmailValidationDirective} from '../../directives/email-validation.directive';
import {PasswordValidationDirective} from '../../directives/password-validation.directive';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgStyle,
    NameValidationDirective,
    EmailValidationDirective,
    PasswordValidationDirective
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent implements OnInit{
  showLogin: boolean = true;
  constructor(protected userSrc: UserService, private productSrc: ProductService) {
  }
  signUp(data: signUp){
    this.userSrc.userSignUp(data);
  }

  ngOnInit(): void {
    this.userSrc.userAuthReload();
  }
  login(data: login){
    this.userSrc.userLogin(data).subscribe(user => {
      if (user) {
        this.localCartToRemoteCart();
      }
    });
  }
  openSignUp(){
    this.showLogin = false;
  }
  openLogin(){
    this.showLogin = true;
  }
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data){
      let cartDataList : Product[]= JSON.parse(data);
      cartDataList.forEach((product : Product, index)=>{
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(()=>{
          this.productSrc.addToCart(cartData).subscribe((result)=>{
            if (result){
              console.log('data is stored in db');
            }
          })
        },400);
        if (cartDataList.length === index + 1){
          localStorage.removeItem('localCart');
        }
      })
    }
    setTimeout(()=>{
      this.productSrc.getCartList(userId);
    },2000)



  }
}
