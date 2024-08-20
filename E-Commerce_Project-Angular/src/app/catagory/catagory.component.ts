import { Component } from '@angular/core';
import { Catagory } from '../Models/catagory';
import { CatagoryService } from '../Services/catagory.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SubCategoryComponent } from '../sub-category/sub-category.component';
import { SubCategoryAdminComponent } from '../sub-category-admin/sub-category-admin.component';
import { AccountService } from '../Services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catagory',
  standalone: true,
  imports: [FormsModule,CommonModule , SubCategoryComponent , SubCategoryAdminComponent],
  templateUrl: './catagory.component.html',
  styleUrl: './catagory.component.css'
})
export class CatagoryComponent {

   cats:Catagory[]=[]
  constructor(public catagorservice:CatagoryService , public account:AccountService , public router:Router){}
  ngOnInit(): void {
   this.catagorservice.getAll().subscribe(data=>{
    console.log(data)
    this.cats=data;
   })
  }
}

