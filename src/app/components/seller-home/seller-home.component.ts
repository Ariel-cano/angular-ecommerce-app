import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {NgForOf} from '@angular/common';
import {faTrash, faEdit} from '@fortawesome/free-solid-svg-icons'
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [
    NgForOf,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.scss'
})
export class SellerHomeComponent implements OnInit{
  productList: Product[] | undefined;
  productMessage : undefined | string;
  icon = faTrash;
  iconEdit = faEdit;
  constructor(private productSrc: ProductService) {
  }

  ngOnInit() {
    this.loadList();
  }

  deleteProduct(id:string){
    this.productSrc.deleteProductById(id).subscribe((result)=>{
      if (result){
        this.productMessage = 'Product is deleted';
        this.loadList();
      }
    });
    setTimeout(()=>{
      this.productMessage = undefined;
    }, 3000)
  }

  loadList(){
    this.productSrc.getProductList().subscribe((result) => {
      if (result) {
        this.productList = result;
      }
    });
  }


}
