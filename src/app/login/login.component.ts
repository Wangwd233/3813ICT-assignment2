import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  getUser(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    const user = {username: 'Bob@gmail.com', password: '123456'};
    var api = "http://localhost:3000/api/login";
    this.http.post(api, user, httpOptions).subscribe(response => {
       console.log(response);
    })
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
