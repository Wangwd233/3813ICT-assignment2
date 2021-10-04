import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    var api = "http://localhost:3000/api/login";
    this.http.get(api).subscribe((response:any) => {
      console.log(response);
    })
  }

}
