import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {login, signUp} from '../models/data-types';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  baseUrl = 'http://localhost:3000/seller'
  isSellerLoggedIn = signal<boolean>(false);
  isLoginError = signal<boolean>(false)

  constructor(private http : HttpClient, private router: Router) {
  }

  userSignUp(data: signUp){
    return this.http.post(this.baseUrl, data, {observe: 'response'}).subscribe((result)=>{
      if (result){
        this.isSellerLoggedIn.set(true);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
      }
    })
  };

  reloadSeller(){
    if (localStorage.getItem('seller')){
      this.isSellerLoggedIn.set(true);
      this.router.navigate(['seller-home']);
    }
  }

  userLogin(data : login){
    this.http.get(`${this.baseUrl}?email=${data.email}&password=${data.password}`,{observe: 'response'}).subscribe((result: any)=>{
      if (result && result.body && result.body.length===1){
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        this.isLoginError.set(false);
      }else{
        console.warn('login failed');
        this.isLoginError.set(true);
      }
    })
  }
}
