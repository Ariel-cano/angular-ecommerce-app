import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {order} from '../../models/data-types';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit{
  orderData: order[] | undefined;
  constructor(private productSrc: ProductService) {
  }
  ngOnInit() {
    this.productSrc.orderList().subscribe((result)=>{
      this.orderData = result;
    })
  }

}
