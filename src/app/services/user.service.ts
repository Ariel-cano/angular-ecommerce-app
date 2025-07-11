import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {login, signUp} from '../models/data-types';
import {Router} from '@angular/router';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = 'http://localhost:3000/users';
  invalidUserAuth = signal<boolean>(false);

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
  userLogin(data: login): Observable<signUp | null> {
    return this.http.get<signUp[]>(`${this.baseUrl}?email=${data.email}&password=${data.password}`, {observe: "response"}).pipe(
      map(result => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          this.router.navigate(['/']);
          this.invalidUserAuth.set(false);
          return result.body[0];
        } else {
          this.invalidUserAuth.set(true);
          return null;
        }
      })
    );
  }
}
