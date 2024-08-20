import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Catagory } from '../Models/catagory';

@Injectable({
  providedIn: 'root'
})
export class CatagoryService {

  private baseurl="https://localhost:7016/api/Catagory/"
  constructor(public http:HttpClient) { }

  getAll(){
    return this.http.get<Catagory[]>(this.baseurl);
 }
 addCatagory(catagory:Catagory){
  return this.http.post<Catagory>(this.baseurl,catagory);
 }
}
