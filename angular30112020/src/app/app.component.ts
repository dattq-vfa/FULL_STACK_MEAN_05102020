import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 5;

  //mang
  arr=[1,2,3,4,5]
  lg;
  //function
  Login(username, password){
    this.lg = 'username: ' + username.value +' and password: '+ password.value;
  }

}
