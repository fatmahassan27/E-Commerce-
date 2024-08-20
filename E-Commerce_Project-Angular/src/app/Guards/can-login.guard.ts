import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canLoginGuard: CanActivateFn = (route, state) => {
  
  let t=localStorage.getItem("token");
  let router=inject(Router);
  
  if(t==null){
    let router=inject(Router);
    router.navigateByUrl("/Login");
    return false;
  }

  return true;
};

