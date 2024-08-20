import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../Models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {
  private baseurl="https://localhost:7016/api/Contact/"

  constructor( public http:HttpClient) { }

  getAll(){
    return this.http.get<Contact[]>(this.baseurl);
 }
 addContact(contact:Contact){
  return this.http.post<Contact>(this.baseurl,contact);
 }
}
