import { Component } from '@angular/core';
import { SubCategory } from '../Models/sub-category';
import { SubCategoryService } from '../Services/sub-category.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../Services/account.service';

@Component({
  selector: 'app-sub-category-admin',
  standalone: true,
  imports: [FormsModule , RouterLink , CommonModule],
  templateUrl: './sub-category-admin.component.html',
  styleUrl: './sub-category-admin.component.css'
})
export class SubCategoryAdminComponent {



 Subcats:SubCategory[]=[]
  constructor(private subcatService:SubCategoryService ,private router:Router , public accountService:AccountService){
  }

  sub:Subscription|null=null;

  ngOnInit(): void {
    this.subcatService.getAll().subscribe(data=>{
      this.Subcats=data;
      console.log(this.Subcats)

  })
}
  Add(){

      this.router.navigateByUrl("/SubCategoryAdmin/Add");
    }

  Delete(id: number) {
      this.subcatService.deleteSubCatById(id).subscribe({
        next: () => {
          console.log('Product deleted successfully.');
          this.Subcats = this.Subcats.filter(subcat => subcat.subCatId !== id);
        },
      })
    }
  ngOnDestroy(){
    this.sub?.unsubscribe();
  }
}
