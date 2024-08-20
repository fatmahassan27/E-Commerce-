import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../Models/product';
import { BehaviorSubject, Observable, Subject, catchError, of, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  private WishCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public WishCount$: Observable<number> = this.WishCountSubject.asObservable();
  private wishItemsSubject = new Subject<any[]>();
  private baseurl="https://localhost:7016/api/WishList/"
  constructor(public http:HttpClient) { }

  addToWish(productId: number , userId:number){
    const url = `${this.baseurl}add-to-wishlist/${productId}/${userId}`
    return this.http.post<any>(url , productId);
  }

  getUserItems(userId:number){
    return this.http.get<Product[]>(`${this.baseurl}${userId}`);
  }

  getCartProductById(productId: number){

    return this.http.get<any>(this.baseurl + productId);
  }

  DeleteItem(productId: number , userId:number){
    const url = `${this.baseurl}${productId}/${userId}`
    return this.http.delete<any>(url).pipe(
      switchMap(() => {
        this.WishCountSubject.next(this.WishCountSubject.value-1);
        return of(null);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  fetchCartItems(): Observable<any[]> {
    // Make the HTTP GET request to fetch cart items from the server
    const fetchUrl = "https://localhost:7016/api/WishList";
    return this.http.get<any[]>(fetchUrl);
  }

  updateCartItems(cartItems: any[]): void {
    // Emit the updated cart items to subscribers
    this.wishItemsSubject.next(cartItems);
  }

  // Method to get cart items as observable
  getCartItems(): Observable<any[]> {
    return this.wishItemsSubject.asObservable();
  }

  updateWishCount(count: number): void {
    this.WishCountSubject.next(count);
  }

  incrementCartCount(quantity: number): void {
    this.WishCountSubject.next(this.WishCountSubject.value + quantity);
  }

  DeleteUserItems(userId:number){
    const url = `${this.baseurl}${userId}`
    return this.http.delete<any>(url)
  }
}

