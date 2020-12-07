import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ProductComponent } from './product/product.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';

//gọi http, để gọi api
import { HttpClient} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ContactComponent,
    HomeComponent,
    LoginComponent,
    PostComponent,
    ProductComponent,
    RegisterComponent,
    Page404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
