import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SocketService } from '../services/socket.service';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('chatChild') chat:any;
  msg:any = '';
  isLogin = false;
  user = {
          username: '', 
          password: ''
        };
  errorMsg = '';

  constructor(private http: HttpClient) {
      
   }

  ngOnInit(): void {
    
  }
  
  getUser(){
    if (this.user.username === ''){
      this.errorMsg = 'Username should not be empty!';
    }else{
      if(this.user.password === ''){
        this.errorMsg = 'Password should not be empty!';
      }else{
        this.errorMsg = '';
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
    }

    
  }

  logout(){
    this.isLogin = false;
    this.chat.leaveroom();
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
