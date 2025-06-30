import {Component, OnInit} from '@angular/core';
import {NgbCarousel, NgbSlide} from '@ng-bootstrap/ng-bootstrap';
import {ProductService} from '../../services/product.service';
import {cart, Product} from '../../models/data-types';
import {NgForOf} from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        NgbCarousel,
        NgbSlide,
        NgForOf,
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];


  constructor(private productSrc : ProductService) {
  }

  ngOnInit(){
    this.productSrc.popularProducts().subscribe((data)=>{
      this.popularProducts = data;
    });
    this.productSrc.getTrendyProducts().subscribe((data)=>{
      this.trendyProducts = data;
    })
  }

  



}
