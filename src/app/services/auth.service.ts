import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { HttpClient } from '@angular/common/http';
import { InitialState } from '../store/reducers';
import { LoadingBarService } from 'ngx-loading-bar';
import { GetItems, LoadItems } from '../store/actions';
import { dataResult } from '../store/interface';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEV_BASE_URL } from './base';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  constructor(
    private http: HttpClient,
    private ngRedux: NgRedux<InitialState>,
    private loadingBarService: LoadingBarService
  ) { 
  }

  public isAuthenticated(): boolean {
    const token = JSON.parse(localStorage.getItem('!usrDet@'))
    // Check whether the token is expired and return
    // true or false
    if (token != null) return true
    else return false 
    // !this.jwtHelper.isTokenExpired(token);
  }
  

 async createUser(userDetails) {
       
    let stats = new Subject<string>();
    this.http
      .post(DEV_BASE_URL+'/users',userDetails)
      .subscribe((datares: dataResult) => {
        this.ngRedux.dispatch(GetItems());
        const {password, ...rest} = userDetails
          const userDet = rest

        localStorage.setItem('!usrDet@', JSON.stringify(userDet))
        stats.next('Success')
      });
      return stats.asObservable()
  }


   async emailExist(email){
    let status = new Subject<boolean>();
    await this.http.get(DEV_BASE_URL+'/users?email='+email)
    .subscribe((datares: dataResult) => {
      // this.ngRedux.dispatch(LoadItems(datares));
      if (datares[0]) {
        
        status.next(true)
      }else {
        status.next(false)
      } 
    });
    
    return status.asObservable();
  }

  async usernameExist(username){
    let status = new Subject<boolean>();
    await this.http
      .get(DEV_BASE_URL+'/users?username='+username)
      .subscribe((datares: dataResult) => {
        // this.ngRedux.dispatch(LoadItems(datares));
        if (datares[0]) {
          
          status.next(true)
        }else  {
          status.next(false)
        }
      });
      
      return status.asObservable();
   
  }
  

   login(loginDet): Observable<any> {
  return this.http
    .get(DEV_BASE_URL+'/users?email='+loginDet.email+'&password='+loginDet.password)
      
  }
}
