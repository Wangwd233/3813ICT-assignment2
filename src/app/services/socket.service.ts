import { Injectable } from '@angular/core';

import { io } from 'socket.io-client';
import { Observable } from 'rxjs';

//games namespace
const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: any;
  

  constructor() { }

  initSocket(): void{
    this.socket = io(SERVER_URL);
    //return ()=>{this.socket.disconnect();}
  }

  chat(message: string){
    this.socket.emit('message', message);
  }


  joinroom(selroom:any): void{
    this.socket.emit("joinRoom", selroom);
  }
/*
  leaveroom(selroom): void{
    this.socket.emit("leaveRoom", selroom);
  }*/

  joined(){
    return new Observable(observer=>{

      this.socket.on('joined', (data:any) => {
            observer.next(data); 
        });

    });
  }

  createroom(newroom:any){
    this.socket.emit('newroom', newroom);
  }
/*
  reqnumusers(selroom){
    this.socket.emit("numusers", selroom);
  }
*/
  getnumusers(){
    return new Observable(observer=>{

      this.socket.on('numusers', (data:any) => {
            observer.next(data); 
        });

    });
  }
  
  reqroomList(){
    this.socket.emit('roomlist', 'list please');
  }

  getroomList(){
    return new Observable(observer=>{

      this.socket.on('roomlist', (data:any) => {
            observer.next(data); 
        });

    });
  }

  getAlt(){
    return new Observable(observer=>{

      this.socket.on('alt', (msg:any) => {
            observer.next(msg); 
        });

    });
  }

  notice(){
    return new Observable(observer=>{

      this.socket.on('notice', (data:any) => {
            observer.next(data); 
        });

    });
  }

  sendMessage(message: string): void{
    this.socket.emit("message", message);
  }

  /*getMessage(){
    return new Observable(observer=>{
      this.socket.on('message', (data)=>{observer.next(data)});
    });
    //this.socket.on('message', (message)=>next(message));
  }*/

  getMessage(){

    return new Observable(observer=>{

      this.socket.on('message', (data:any) => {observer.next(data)

        });

    });

  }
  
}
