import { Component } from '@angular/core';
import { SubCategoryService } from '../../Services/sub-category.service';
import { SubCategory } from '../../Models/sub-category';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sub-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './sub-update.component.html',
  styleUrl: './sub-update.component.css'
})
export class SubUpdateComponent {

  subcat:SubCategory= new SubCategory(0,"",true,new Date(),0);
  constructor(public subcatservice:SubCategoryService , public router: Router , public activatedRoute:ActivatedRoute){

}
ngOnInit(): void {
  this.activatedRoute.params.subscribe(p=>{
    this.subcatservice.getSubById(p['id']).subscribe(d=>{
      this.subcat=d;
    })
  })

}
Save(){
  this.subcatservice.updateSubCat(this.subcat).subscribe(d=>{
    console.log(d);
    this.router.navigateByUrl("/SubCategoryAdmin");
  })
}

}

