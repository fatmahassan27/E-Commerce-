import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { canLoginGuard } from './Guards/can-login.guard';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './Account/login/login.component';
import { RegisterComponent } from './register/register.component';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { ProductComponent } from './Product/product/product.component';
import { ProductDetialsComponent } from './Product/product-detials/product-detials.component';
import { CartListComponent } from './Cart/cart-list/cart-list.component';
import { SubCategoryProductComponent } from './sub-category-product/sub-category-product.component';
import { WishListComponent } from './WishList/wish-list/wish-list.component';
import { ProductUpdateComponent } from './Product/product-update/product-update.component';
import { CheckOutComponent } from './Checkout/check-out/check-out.component';
import { SubCategoryAdminComponent } from './sub-category-admin/sub-category-admin.component';
import { SubAddComponent } from './sub-category-admin/sub-add/sub-add.component';
import { SubUpdateComponent } from './sub-category-admin/sub-update/sub-update.component';
import { AdminContactUsComponent } from './contact-us/admin-contact-us/admin-contact-us.component';
import { CustomerContactUsComponent } from './contact-us/customer-contact-us/customer-contact-us.component';
import { AboutComponent } from './about/about.component';
import { SubDeleteComponent } from './sub-category-admin/sub-delete/sub-delete.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { LogoutComponent } from './Account/logout/logout.component';
import { PlaceOrderComponent } from './place-order/place-order.component';

export const routes: Routes = [

{path:'home',component:HomeComponent,title:"Home"},
{path:'About',component:AboutComponent,title:"About"},
{path:'Contact/Customer',component:CustomerContactUsComponent,title:"Contact"},
{path:'Contact/Admin',component:AdminContactUsComponent,title:"Contact",canActivate:[canLoginGuard]},
{path:'Category',component:CatagoryComponent,title:"Category"},
{path:'PlaceOrder',component:PlaceOrderComponent,title:"Category"},
{path:'SubCategory/:subCatId', component:SubCategoryProductComponent,title:"SubProduct"},
{path:'SubCategoryAdmin',component:SubCategoryAdminComponent,title:"SubCategory" , canActivate:[canLoginGuard] },
{path:'SubCategoryAdmin/Add',component:SubAddComponent,title:"SubCategory"},
{path:'SubCategoryAdmin/Update/:id',component:SubUpdateComponent,title:"SubCategory"},
{path:'Cart',component:CartListComponent,title:"Cart"},
{path:'Wish',component:WishListComponent,title:"WishList"},
{path:'Register',component:RegisterComponent,title:"Register"},
{path:'Login',component:LoginComponent,title:"Login"},
{path:'Logout',component: LogoutComponent,title:"Logout"},
{path:'Products',component:ProductComponent,title:"Products"},
{path: 'Products/details/:id', component: ProductDetialsComponent,title: "ProductDetials"} ,
{ path: 'Products/details/:id', component: ProductDetialsComponent,title: "ProductDetials"} ,
{ path: 'Products/update/:id', component: ProductUpdateComponent,title: "ProductUpdate"} ,
{path:'Checkout',component:CheckOutComponent,title:"Checkout"},
{path:'',redirectTo:'home',pathMatch:'full'},
{path:'**',component:NotFoundComponent}
];

