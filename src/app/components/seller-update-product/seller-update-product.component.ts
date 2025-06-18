import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss'
})
export class SellerUpdateProductComponent {
  submitProduct(data: any){

  }

}
