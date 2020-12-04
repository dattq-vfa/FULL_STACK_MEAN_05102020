//truyền dữ liệu từ child -> father: 
//1. output
//2.eventEmitter


import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
//xuất dữ liệu ra bên ngoài
export class FooterComponent implements OnInit {

  //gọi ra sử dụng
  @Output() acceptData: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    this.acceptData.emit('hello');
  }

}
