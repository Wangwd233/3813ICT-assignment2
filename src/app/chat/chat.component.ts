import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

const SERVER_URL = "http//localhost:3000";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //private socket;
  messagecontent:string="";
  messages:string[]=[];
  rooms=[];
  roomslist:string="";
  roomnotice:string="";
  currentroom:string="";
  isinRoom= false;
  newroom:string="";
  numusers:number=0;
  ioConnection:any;


  constructor(private socketservice: SocketService) {}

  ngOnInit(): void {
    this.initIoConnection();
  }

  private initIoConnection(){

    this.ioConnection = this.socketservice.initSocket();

    this.socketservice.getMessage().subscribe((message:any) => {

        this.messages.push(message);

      });

  }

  public chat(){
    this.socketservice.sendMessage(this.messagecontent);
  }

  

  /*joinroom(){

  }

  leaveroom(){

  }

  createroom(){

  }

  clearnotice(){

  }*/

}
