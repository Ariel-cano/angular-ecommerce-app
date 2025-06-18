import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit{
  productList: Product[] | undefined;
  constructor(private productSrc: ProductService) {
  }

  ngOnInit() {
    this.productSrc.getProductList().subscribe((result) => {
     if (result) {
        this.productList = result;
      }
    });
  }

}
