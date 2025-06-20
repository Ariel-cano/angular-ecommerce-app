import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {Product} from '../../models/data-types';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  searchResult: undefined | Product[];
  query : string | null = null

  constructor(private activatedRoute: ActivatedRoute, private productSrc: ProductService) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.query = params.get('query');
      this.query && this.productSrc.searchProduct(this.query).subscribe((result)=>{
        this.searchResult = result;
      })
    });
  }


}
