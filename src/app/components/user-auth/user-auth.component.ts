import {Component, effect, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {login, signUp} from '../../models/data-types';
import {UserService} from '../../services/user.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent implements OnInit{
  showLogin: boolean = true;
  constructor(protected userSrc: UserService) {
  }
  signUp(data: signUp){
    this.userSrc.userSignUp(data);
  }

  ngOnInit(): void {
    this.userSrc.userAuthReload();
  }
  login(data: login){
    this.userSrc.userLogin(data);

  }
  openSignUp(){
    this.showLogin = false;
  }
  openLogin(){
    this.showLogin = true;
  }
}
