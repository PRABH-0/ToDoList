import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  http = inject(HttpClient);
  isLogin:Boolean = true ;
  signUpUrl:string = "https://localhost:7198/api/ToDoList/signup";
  loginUserUrl:string = "https://localhost:7198/api/ToDoList/login?";
  data:any;
  userId:number|null = null ;

  userObj={
    username: "",
    email: "",
    password: null,
  };

  constructor(private router: Router) {}


  toggleLogin(){
    this.isLogin = ! this.isLogin;
  }

  loginUser(){
    console.log(this.userObj)
    this.data = this.http.get(`${this.loginUserUrl}username=${this.userObj.username}&password=${this.userObj.password}`,).subscribe((res:any)=>{
      this.userId = res.id;
      if(this.userObj.password == res.password){
        this.router.navigate(['List' , this.userId]);

      }else{
        alert(" Password not Match")
      }
    })
  }

  signUpUser(){
    // console.log(this.userObj)
    this.data = this.http.post(`${this.signUpUrl}`,this.userObj).subscribe((res:any)=>{
      this.userId = res.id;
      // console.log(res);
      // console.log(this.userId);
      this.router.navigate(['List' , this.userId]);
    })
  }
}
