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
  constructor(private activatedRoute: ActivatedRoute, private productSrc: ProductService) {
  }

  ngOnInit() {
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    productId && this.productSrc.getProductById(productId).subscribe((data)=>{
      this.productData = data;
    })


  }


}
