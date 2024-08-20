import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../Models/sub-category';
import { Product } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService {

  private baseurl="https://localhost:7016/api/SubCatagory"
  constructor(public http:HttpClient) { }

  getAll(){
    return this.http.get<SubCategory[]>(this.baseurl);
}

getProductsBySubcategoryId(Subid: number){
  return this.http.get<Product[]>(`${this.baseurl}/${Subid}`);
}

addSubCat(subCategory: SubCategory) {
  return this.http.post<SubCategory>(this.baseurl, subCategory);
}

getSubById(id:number){
  const url = `${this.baseurl}/GetSubCatById/${id}`;
  return this.http.get<SubCategory>(url);
}
updateSubCat(subCategory:SubCategory){
  const url = `${this.baseurl}/${subCategory.subCatId}`;
  return this.http.put<any>(url,subCategory);
}
deleteSubCatById(id: number){
  const url = `${this.baseurl}/${id}`;
  return this.http.delete<any>(url);
}
}
