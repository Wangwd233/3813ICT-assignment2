import { Component, OnInit, Input } from '@angular/core';
import { SocketService } from '../services/socket.service';

const SERVER_URL = "http//localhost:3000";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  //private socket;
  @Input() user:string='';
  messagecontent:string="";
  messages:any[] = [];
  rooms:any=[];
  roomslist:string="";
  roomnotice:string="";
  currentroom:string="";
  isinRoom= false;
  newroom:string="";
  numusers:number=0;
  ioConnection:any;
  alertMessges:any;


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

    this.socketservice.notice().subscribe((data:any) => {
      this.roomnotice = data;
      alert(this.roomnotice);
    })

    this.socketservice.joined().subscribe((data:any) => {
      this.isinRoom = data;
    })
    
    this.socketservice.getnumusers().subscribe((data:any) => {
      this.numusers = data;
    })
    
    this.socketservice.getMessage().subscribe((message:any) => {
        this.messages = JSON.parse(message);
    });


  }

  public chat(){
    this.socketservice.sendMessage(this.messagecontent, this.user);
  }

  joinroom(){
    if (this.roomslist){
      console.log(this.roomslist);
      this.socketservice.joinroom(this.roomslist);
    }
    
  }

  leaveroom(){
     this.socketservice.leaveroom(this.roomslist);
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

