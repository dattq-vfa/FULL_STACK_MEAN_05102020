import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }


  userData ={ //data dùng để load form khi chỉnh sữa kèm [ngModel]="userData.username" bên html
    username: 'nguyen van A',
    password: '1234'
  }

  ngOnInit(): void {
  }
  login(data){
    console.log(data);
  }

}
