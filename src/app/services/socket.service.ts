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

  /*joinroom(selroom): void{
    this.socket.emit("joinRoom", selroom);
  }

  leaveroom(selroom): void{
    this.socket.emit("leaveRoom", selroom);
  }

  joined(next){
    this.socket.on('joined', res=>next(res));
  }*/

  createroom(newroom:any){
    this.socket.emit('newroom', newroom);
  }
/*
  reqnumusers(selroom){
    this.socket.emit("numusers", selroom);
  }

  getnumusers(next){
    this.socket.on
  }
  
  reqroomList(){
    this.socket.emit('roomlist', 'list please');
  }

  getroomList(next){
    this.socket.on('roomlist', res=>next(res));
  }

  notice(next){
    this.socket.on('notice', res=>next(res));
  }*/

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
