import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRegister } from '../Models/user-register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseurl="https://localhost:7016/api/Account/Register"

  constructor(public http:HttpClient) { }
  addCustomer(customer:UserRegister){
    return this.http.post<UserRegister>(this.baseurl,customer);
}
}
