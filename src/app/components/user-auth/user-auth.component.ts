import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {signUp} from '../../models/data-types';

@Component({
  selector: 'app-user-auth',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.scss'
})
export class UserAuthComponent {
  constructor() {
  }
  signUp(data: signUp){
    console.log(data);
  }
}
