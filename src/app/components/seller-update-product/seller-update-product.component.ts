import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {ColorValidationDirective} from "../../directives/color-validation.directive";
import {NameValidationDirective} from "../../directives/name-validation.directive";
import {NgIf} from "@angular/common";
import {UrlValidationDirective} from "../../directives/url-validation.directive";

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ColorValidationDirective,
        NameValidationDirective,
        NgIf,
        UrlValidationDirective
    ],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.scss'
})
export class SellerUpdateProductComponent implements OnInit{
  productData: undefined | Product;
  productMessage: undefined | string;

  constructor(private route: ActivatedRoute, private productSrc: ProductService, private router: Router) {
  }

  ngOnInit() {
    let productId = this.route.snapshot.paramMap.get('id');
    productId && this.productSrc.getProductById(productId).subscribe((data)=>{
      this.productData = data;
    })
  }

  submitProduct(data: any){
    if (this.productData){
      data.id = this.productData.id
    }
    this.productSrc.updateProduct(data).subscribe((result)=>{
      if (result){
        this.productMessage = 'Product has updated'
      }
    })
    setTimeout(()=>{
      this.productMessage = undefined;
      this.router.navigate(['seller-home']);
    },3000)

  }


}
