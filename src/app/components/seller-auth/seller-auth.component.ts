import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SellerService} from '../../services/seller.service';
import {signUp} from '../../models/data-types';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent implements OnInit{

  constructor(private seller: SellerService) {
  }

  ngOnInit() {
    this.seller.reloadSeller();
  }

  signUp(data: signUp){
    console.warn(data);
    this.seller.userSignUp(data);
  }
}
