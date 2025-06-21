import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {signUp} from '../../models/data-types';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent implements OnInit{
  constructor(private userSrc: UserService) {
  }
  signUp(data: signUp){
    this.userSrc.userSignUp(data);
  }

  ngOnInit(): void {
    this.userSrc.userAuthReload();
  }
}
