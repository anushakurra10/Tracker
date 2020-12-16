import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {  BehaviorSubject } from 'rxjs';
import  Ws from "@adonisjs/websocket-client";

export const WS_ENDPOINT = environment.wsEndpoint;
 
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: any;
  note;
  markers$ = new BehaviorSubject<any>(null);
  selectedDevices;
 constructor(){}

 
  public connect(): void {
    this.socket$  =  Ws ( WS_ENDPOINT ,  { } ) ;
    this.socket$.connect ( ) ; 
   }
  
  public subscribeToTopic(items) {
    this.selectedDevices=items;
    for(var i=0;i<items.length;i++){
      let topic_Name="gps_data:"+items[i].item_id
      const topic = this.socket$.subscribe(topic_Name);
      topic.on('error', (error) => {
        console.log(error)
      })

      topic.on("gps_data", message => {
        this.markers$.next(message)              
      });
    }
  }
}
