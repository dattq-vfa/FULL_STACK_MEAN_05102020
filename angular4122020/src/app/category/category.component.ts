import { Component, OnInit } from '@angular/core';

//lấy ra params
import { ActivatedRoute, ParamMap } from '@angular/router';
import { from } from 'rxjs';
//gọi http, để gọi api
import {HttpClient, HttpHeaders} from '@angular/common/http';
//gọi service
import { CategoryService } from './category.service'
import { ProductService } from '../product/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private router:ActivatedRoute, private category: CategoryService) { }

  title;
  // api_url = 'http://localhost:3000/product/list';

  ngOnInit(): void {
    this.router.paramMap.subscribe((param:ParamMap)=>{

      this.title = param.get('id');

    });
    //get
    // this.http.get(this.api_url).subscribe((kq)=>{
    //   this.obj = kq['data'];
    // });

    this.category.addcategory().subscribe((kq)=>{
      console.log(kq);
    });

  }

}
