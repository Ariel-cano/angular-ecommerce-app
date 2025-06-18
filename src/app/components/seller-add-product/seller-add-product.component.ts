import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';

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
  addProductMessage: string | undefined;
  constructor(private productSrc: ProductService) {
  }

  submitProduct(data: Product){
    this.productSrc.addProduct(data).subscribe((result)=>{
      if (result){
        this.addProductMessage = "Product added successfully";
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
    }, 3000);
  }
}
