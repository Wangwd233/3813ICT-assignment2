import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  msg:any = '';
  isLogin = false;
  user = {
          username: '', 
          password: ''
        };

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  getUser(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    var api = "http://localhost:3000/api/login";
    this.http.post(api, this.user, httpOptions).subscribe(response => {
       this.msg = response;
       alert(this.msg.msg);
       this.isLogin = this.msg.isLogin;
    })
  }

  logout(){
    this.isLogin = false;
  }
  
  /*getUser(){
    var api = "http://localhost:3000/api/login";
    this.http.get(api).subscribe((response:any) => {
       if (response.length){
         console.log(response[0].username);
       }else{
         console.log("nothing");
       }
    })
  }*/

}
