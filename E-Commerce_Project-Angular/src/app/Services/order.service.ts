import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../Models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseurl = 'https://localhost:7016/api/Order/' ;

  constructor(public http:HttpClient) { }


  getAll(){
    return this.http.get<Order[]>(this.baseurl);
  }

  getAllOrdersByUserId(id: number){
    return this.http.get<Order[]>(this.baseurl+`userOrders/${id}`);
  }

  getById(id: number){
    return this.http.get<Order>(this.baseurl+id);
  }

  delete(id:number){
    return this.http.delete<Order>(`${this.baseurl}?id=${id}`);
  }

  update(order: Order){
    return this.http.put<Order>(this.baseurl ,order);
  }

  add(order:Order){
    return this.http.post<Order>(this.baseurl,order);
  }


}
