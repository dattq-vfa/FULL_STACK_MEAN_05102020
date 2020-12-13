import { Component, OnInit } from '@angular/core';
//import service 
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //gọi service ra sài
  constructor(private lg: LoginService ) { }

  ngOnInit(): void {
  }
  login(username,password){
    this.lg.svlogin(username.value,password.value).subscribe(kq=>{
      console.log(kq);
    })
  }

}
