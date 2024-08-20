import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public http: HttpClient) { }
  baseurl="https://localhost:7016/api/product/"

  getAll(){
    return this.http.get<Product[]>(this.baseurl);
  }
  
  getProductById(productId: number): Observable<any> {
    
    return this.http.get<any>(this.baseurl + productId);
  }
  createProduct(product: any) {
    return this.http.post(this.baseurl, product);
  }
  updateProductById(productId: number, product: any): Observable<any> {
    return this.http.put<any>(`${this.baseurl}${productId}`, product);
  }
  deleteProductById(id: number): Observable<void> {
    const url = `${this.baseurl}${id}`; // Correct concatenation
    return this.http.delete<void>(url);
  }
}
