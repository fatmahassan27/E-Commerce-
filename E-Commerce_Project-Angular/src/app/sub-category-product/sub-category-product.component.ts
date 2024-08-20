import { Component } from '@angular/core';
import { SubCategoryService } from '../Services/sub-category.service';
import { Product } from '../Models/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../Services/cart.service';
import { ProductComponent } from '../Product/product/product.component';
import { AccountService } from '../Services/account.service';
import { WishListService } from '../Services/wish-list.service';

@Component({
  selector: 'app-sub-category-product',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './sub-category-product.component.html',
  styleUrl: './sub-category-product.component.css'
})
export class SubCategoryProductComponent {
  products:Product[] = [];
  subcategoryId:number=0;
  constructor(public Subcatagorservice:SubCategoryService , public route:ActivatedRoute , public account:AccountService , public cartService:CartService ,public wishService:WishListService ){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.subcategoryId = +params['subCatId'];
      this.Subcatagorservice.getProductsBySubcategoryId(this.subcategoryId)
        .subscribe(products => {
          this.products = products;
        });
    });
  }
  addToCart(productId: number , userId:number): void {
    this.cartService.addToCart(productId,userId).subscribe(
      () => {
        console.log('Product added to cart successfully.');
        this.cartService.incrementCartCount(1);
        });
      }
      addWish(productId: number , userId:number): void {
        this.wishService.addToWish(productId,userId).subscribe(
          () => {
            console.log('Product added to WishList successfully.');
            this.wishService.incrementCartCount(1);
            });
          }
}
