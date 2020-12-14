//ng g  guard category/category


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryGuard implements CanActivate {

  constructor(private router: Router){}//thêm dòng này
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      var xd = 1;

      if(xd == 1){
        return true;
      }
      else
      {
        this.router.navigate(['/dang-nhap.html']);
        return false;
      }
    
      
  }
  
}
