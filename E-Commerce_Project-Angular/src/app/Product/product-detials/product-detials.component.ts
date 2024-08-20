import { Component } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from '../../Services/cart.service';
import { AccountService } from '../../Services/account.service';
import { WishListService } from '../../Services/wish-list.service';

@Component({
  selector: 'app-product-detials',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-detials.component.html',
  styleUrl: './product-detials.component.css'
})
export class ProductDetialsComponent {
  product:any;
  constructor(public  productService: ProductsService,public activatedRoute:ActivatedRoute, public cartService:CartService , public account:AccountService , public wishService:WishListService){}
  ngOnInit(): void {

    this.activatedRoute.params.subscribe(p=>{
      this.productService.getProductById(p['id']).subscribe(data=>{
        this.product=data;
      })
    })

  }

  addToCart(productId: number , userId:number): void {
    if (userId !== undefined) {
    this.cartService.addToCart(productId,userId).subscribe(
      () => {
        console.log('Product added to cart successfully.');
        this.cartService.incrementCartCount(1);
        });
      }
      }

      addWish(productId: number , userId:number): void {
        this.wishService.addToWish(productId,userId).subscribe(
          () => {
            console.log('Product added to WishList successfully.');
            this.wishService.incrementCartCount(1);
            });
          }
}
