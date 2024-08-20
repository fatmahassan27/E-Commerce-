import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { Cart } from '../Models/cart';
import { BehaviorSubject, Observable, Subject, catchError, forkJoin, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public cartCount$: Observable<number> = this.cartCountSubject.asObservable();
  private cartItemsSubject = new Subject<any[]>();
  private baseurl="https://localhost:7016/api/Cart/"
  constructor(public http:HttpClient) { }

  addToCart(productId: number , userId:number){
    const url = `${this.baseurl}add-to-cart/${productId}/${userId}`
    return this.http.post<any>(url , productId);
  }

  getUserItems(userId:number){
    return this.http.get<Cart[]>(`${this.baseurl}${userId}`);
  }

  getCartProductById(productId: number){

    return this.http.get<any>(this.baseurl + productId);
  }

 fetchCartItems(): Observable<any[]> {
    // Make the HTTP GET request to fetch cart items from the server
    const fetchUrl = "https://localhost:7016/api/Cart";
    return this.http.get<any[]>(fetchUrl);
  }

  updateCartItems(cartItems: any[]): void {
    // Emit the updated cart items to subscribers
    this.cartItemsSubject.next(cartItems);
  }

  // Method to get cart items as observable
  getCartItems(): Observable<any[]> {
    return this.cartItemsSubject.asObservable();
  }

  updateCartCount(count: number): void {
    this.cartCountSubject.next(count);
  }

  incrementCartCount(quantity: number): void {
    this.cartCountSubject.next(this.cartCountSubject.value + quantity);
  }

  DeleteItem(productId: number , userId:number){
    const url = `${this.baseurl}${productId}/${userId}`
    return this.http.delete<any>(url).pipe(
      switchMap(() => {
        this.cartCountSubject.next(this.cartCountSubject.value);
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  IncreaseQuantity(productId: number , userId:number){
    const url = `${this.baseurl}increase/${productId}/${userId}`
    return this.http.put<any>(url , productId);
  }

  DecreaseQuantity(productId: number , userId:number){
    const url = `${this.baseurl}Decrease/${productId}/${userId}`
    return this.http.put<any>(url , productId);
  }

  DeleteUserItems(userId:number){
    const url = `${this.baseurl}${userId}`
    return this.http.delete<any>(url)
  }
}

