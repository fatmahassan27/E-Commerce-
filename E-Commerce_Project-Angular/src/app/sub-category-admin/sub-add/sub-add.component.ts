import { Component } from '@angular/core';
import { SubCategory } from '../../Models/sub-category';
import { SubCategoryService } from '../../Services/sub-category.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sub-add.component.html',
  styleUrl: './sub-add.component.css'
})
export class SubAddComponent {
  Subcat:SubCategory= new SubCategory(0,"",true,new Date(),0);
  sub:Subscription|null=null;
  constructor(public subcatservice:SubCategoryService , public router:Router){

  }
  Save(){
  this.sub=this.subcatservice.addSubCat(this.Subcat).subscribe(data=>{
    console.log(data);
    this.router.navigateByUrl("/home");
});
  }
}
