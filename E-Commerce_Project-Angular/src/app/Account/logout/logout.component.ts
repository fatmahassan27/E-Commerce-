import { Component } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { CartService } from '../../Services/cart.service';
import { Router } from '@angular/router';
import { WishListService } from '../../Services/wish-list.service';


@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})

export class LogoutComponent {

  constructor(public accountservice:AccountService ,public cartService:CartService,public WishService:WishListService ,public router:Router){}

  ngOnInit(): void {
    this.cartService.DeleteUserItems(this.accountservice.r.UserId).subscribe(() => {
      this.cartService.updateCartCount(0);
  })

  this.WishService.DeleteUserItems(this.accountservice.r.UserId).subscribe(
    () => {
      this.WishService.updateWishCount(0);
    },
    (error) => {
      // Handle error appropriately, e.g., log error message
      console.error('Error deleting wishlist items:', error);
      // Update wishlist count even if there's an error
      this.WishService.updateWishCount(0);
    }
  );

    this.accountservice.logout();
    this.router.navigateByUrl("/Login")

}

}
