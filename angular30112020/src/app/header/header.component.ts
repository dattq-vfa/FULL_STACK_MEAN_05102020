//de goi bien tu cha thi su dung thu vien: iInput

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() title;
  constructor() { }

  ngOnInit(): void {
    console.log(this.title)
  }

}
