import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../services/product.service';
import {order} from '../../models/data-types';
import {DatePipe, NgForOf} from '@angular/common';
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    FaIconComponent
  ],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit{
  orderData: order[] | undefined;
  constructor(private productSrc: ProductService) {
  }
  ngOnInit() {
    this.getOrderList();
  }

  cancelOrder(orderId: string | undefined){
    orderId && this.productSrc.cancelOrder(orderId).subscribe((result)=>{
      if (result){
        this.getOrderList();
      }
    })
  }

  getOrderList(){
    this.productSrc.orderList().subscribe((result)=>{
      this.orderData = result;
    })
  }

  protected readonly trashIcon = faTrash;
}
