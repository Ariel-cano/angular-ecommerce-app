import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {signUp} from '../models/data-types';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/users'

  constructor(private http : HttpClient, private router: Router) { }

  userSignUp(user: signUp){
    return this.http.post(this.baseUrl, user, {observe: "response"}).subscribe((result)=>{
      if (result){
        localStorage.setItem('user', JSON.stringify(result.body));
        this.router.navigate(['/']);
      }
    })
  }

  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
}
