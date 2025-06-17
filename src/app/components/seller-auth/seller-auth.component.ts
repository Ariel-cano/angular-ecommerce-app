import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

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
  signUp(data: object){
    console.warn(data)
  }
}
