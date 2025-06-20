import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  productData : undefined | Product;
  productQuantity: number = 1;
  constructor(private activatedRoute: ActivatedRoute, private productSrc: ProductService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let productId = this.activatedRoute.snapshot.paramMap.get('productId');
      productId && this.productSrc.getProductById(productId).subscribe((data)=>{
        this.productData = data;
      })
    });
  }

  handleQuantity(value : string){
    if (this.productQuantity < 20 && value === 'plus'){
      this.productQuantity +=1;
    } else if (this.productQuantity > 1 && value === 'min'){
      this.productQuantity -=1;
    }
  }


}
