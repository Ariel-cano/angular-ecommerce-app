import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SellerService} from '../../services/seller.service';
import {signUp} from '../../models/data-types';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent implements OnInit{
  showLogin : boolean = true;

  constructor(protected seller: SellerService) {
  }

  ngOnInit() {
    this.seller.reloadSeller();
  }
  openLogin(){
    this.showLogin = true;
  }
  openSignUp(){
    this.showLogin = false;
  }

  signUp(data: signUp){
    this.seller.userSignUp(data);
  }
  login(data: signUp){
    this.seller.userLogin(data);
  }


}
