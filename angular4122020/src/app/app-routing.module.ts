import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';


//componet 
import {CategoryComponent} from './category/category.component'
import {ContactComponent} from './contact/contact.component'
import {HomeComponent} from './home/home.component'
import {LoginComponent} from './login/login.component'
import {PostComponent} from './post/post.component'
import {ProductComponent} from './product/product.component'
import {RegisterComponent} from './register/register.component'
import { Page404Component }from './page404/page404.component'
import { CategoryGuard } from './category/category.guard'//import guard

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'danh-muc/:id',
    component: CategoryComponent,
    canActivate: [CategoryGuard] //thêm dòng này vào để AUTH
  },
  {
    path: 'san-pham/:id',
    component: ProductComponent
  },
  {
    path: 'tin-tuc/:id',
    component: PostComponent
  },
  {
    path: 'lien-he.html',
    component: ContactComponent
  },
  {
    path: 'dang-nhap.html',
    component: LoginComponent
  },
  {
    path: 'dang-ky-thanh-vien.html',
    component: RegisterComponent
  },
  {
    path: '**',
    component: Page404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
