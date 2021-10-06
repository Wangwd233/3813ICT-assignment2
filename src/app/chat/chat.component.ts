import { Component, OnInit, OnChanges } from '@angular/core';
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
  rooms:any=[];
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

    this.socketservice.reqroomList();

    this.socketservice.getroomList().subscribe((data:any) => {
      this.rooms = JSON.parse(data);
    })

    this.socketservice.getMessage().subscribe((message:any) => {

        this.messages.push(message);

      });


  }

  public chat(){
    this.socketservice.sendMessage(this.messagecontent);
  }

  getRoom(){
    console.log(this.rooms);
  }

  

  joinroom(){
    if (this.roomslist){
      console.log(this.roomslist);
    }
    
  }

  leaveroom(){

  }

  public createroom(){
    if (this.newroom == ""){
      alert('Can not create room with empty name');
    }else{
      this.socketservice.createroom(this.newroom);
    }  
  }
    
  clearnotice(){

  }

}

