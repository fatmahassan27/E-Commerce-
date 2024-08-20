import { Component  } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AccountService } from '../../Services/account.service';
import { CatagoryComponent } from '../../catagory/catagory.component';
import { CartService } from '../../Services/cart.service';
import { SubCategory } from '../../Models/sub-category';
import { SubCategoryComponent } from '../../sub-category/sub-category.component';
import { WishListComponent } from '../../WishList/wish-list/wish-list.component';
import { WishListService } from '../../Services/wish-list.service';
import { CommonModule } from '@angular/common';
import { SubCategoryAdminComponent } from '../../sub-category-admin/sub-category-admin.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,RouterLinkActive, CatagoryComponent,SubCategoryComponent,SubCategoryAdminComponent , CommonModule ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {constructor(public accountService:AccountService , public cartService:CartService , public wishService:WishListService ,public router:Router){}
cartItemCount = 0;
WishItemCount = 0;
isDropdownOpen=false;
ngOnInit(): void {
  this.cartService.cartCount$.subscribe(count => {
    this.cartItemCount = count;
  });
  this.wishService.WishCount$.subscribe(count => {
    this.WishItemCount  = count;
});
  }


navigateToSubCategory(): void {
  if (this.accountService.r?.isCustomer ) {
    this.router.navigate(['/SubCategory']);
  } else if (this.accountService.r?.isAdmin) {
    this.router.navigate(['/SubCategoryAdmin']);
  }
}
toggleDropdown(event: MouseEvent) {
  event.preventDefault();
  this.isDropdownOpen = !this.isDropdownOpen;
}
}

