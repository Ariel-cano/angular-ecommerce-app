import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {Router} from '@angular/router';
import {UrlValidationDirective} from '../../directives/url-validation.directive';
import {NgIf, NgStyle} from '@angular/common';
import {NameValidationDirective} from '../../directives/name-validation.directive';
import {ColorValidationDirective} from '../../directives/color-validation.directive';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [
    FormsModule,
    UrlValidationDirective,
    NgIf,
    NgStyle,
    NameValidationDirective,
    ColorValidationDirective
  ],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.scss'
})
export class SellerAddProductComponent {
  addProductMessage: string | undefined;
  constructor(private productSrc: ProductService, private router: Router) {
  }

  submitProduct(data: Product){
    this.productSrc.addProduct(data).subscribe((result)=>{
      if (result){
        this.addProductMessage = "Product added successfully";
      }
    });
    setTimeout(() => {
      this.addProductMessage = undefined;
      this.router.navigate(['seller-home']);
    }, 3000);
  }
}
