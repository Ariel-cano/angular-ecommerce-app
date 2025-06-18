import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgIf, NgSwitch, NgSwitchCase} from '@angular/common';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    NgSwitch,
    NgSwitchCase
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';

  constructor(private route: Router) {

  }

  ngOnInit() {
    this.route.events.subscribe((val: any) => {
        if (val.url) {
          if (localStorage.getItem('seller') && val.url.includes('seller')) {
            this.menuType = 'seller';
          } else {
            this.menuType = 'default';
          }
        }
      }
    );
  }

}
