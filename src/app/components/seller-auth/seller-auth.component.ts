import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {SellerService} from '../../services/seller.service';
import {signUp} from '../../models/data-types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.scss'
})
export class SellerAuthComponent {

  constructor(private seller: SellerService, private router : Router) {
  }

  signUp(data: signUp){
    console.warn(data);
    this.seller.userSignUp(data).subscribe((result) => {
      if (result){
        this.router.navigate(['seller-home']);
      }
      console.log(result)
    });
  }
}
