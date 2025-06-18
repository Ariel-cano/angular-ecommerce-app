import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent {

  submitProduct(data: object){
    console.log(data);
  }
}
