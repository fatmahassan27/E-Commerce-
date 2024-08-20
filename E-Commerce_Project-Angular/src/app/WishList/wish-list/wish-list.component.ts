import { Component } from '@angular/core';
import { Product } from '../../Models/product';
import { ProductsService } from '../../Services/products.service';
import { WishListService } from '../../Services/wish-list.service';
import { AccountService } from '../../Services/account.service';
import { CartService } from '../../Services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishList } from '../../Models/wish-list';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  Wishprod:WishList= new WishList(0,0,"","","","","",0,"")
  Wishproduct:WishList[]=[]
  constructor( public productService:ProductsService , public Wishservice:WishListService , public account:AccountService , public cartService:CartService){}
  ngOnInit() {

    this.Wishservice.getUserItems(this.account.r.UserId).subscribe((data: any) => {
      this.Wishproduct = data;

    });
  }
  addToCart(productId: number , userId:number): void {
    this.cartService.addToCart(productId,userId).subscribe(
      () => {
        console.log('Product added to cart successfully.');
        this.cartService.incrementCartCount(1);
        });
      }

      onDelete(productId: number, userId: number): void {
        this.Wishservice.DeleteItem(productId, userId).subscribe({
          next: () => {
            console.log('Product deleted successfully.');

            const index = this.Wishproduct.findIndex(w => w.id ===productId && w.userId==userId);

            this.Wishproduct.splice(index, 1);

            this.Wishprod = new WishList(0,0,"","","","","",0,"");
          },

        });
      }
  }
