import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {signUp} from '../models/data-types';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = signal(false);

  constructor(private http : HttpClient, private router: Router) {
  }

  userSignUp(data: signUp){
    return this.http.post('http://localhost:3000/seller', data, {observe: 'response'}).subscribe((result)=>{
      console.warn(result);
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
}
