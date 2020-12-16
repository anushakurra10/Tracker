import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
import { WebSocketService } from './webSocket.service';

@Injectable({
  providedIn: 'root'
})
export class MarkerService {


  constructor(private service: WebSocketService) {
  }

  markers = [];
  title:string;
  devices=[];
  map;
  icon = {
    icon: Leaflet.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      iconUrl: '../assets/images/marker-icon.png',
      shadowUrl: '../assets/images/marker-shadow.png'
    })
  };
   

  addMarker(val){
   const marker= Leaflet.marker([val.lat,val.lng], this.icon)
  const index=this.service.selectedDevices.findIndex((item)=>{
        return item.item_id == val.imei
  })
    if(index == -1) return;
    for(var i=0;i<this.devices.length;i++){
      if(this.devices[i]==val.imei){
       this.map.removeLayer(this.markers[i]);
      }
    }
    this.markers.push(marker);
    this.devices.push(val.imei)
    marker.addTo(this.map);
    this.title = this.service.selectedDevices[index].item_text;
    const htmlElm=`<div><div><b>Title:</b>${this.title} </div>
    <div><b>Speed:</b>${val.speed}</div>
    <div><b>Server DateTime:</b>${val.server_datetime} </div></div>`;
    marker.bindPopup(htmlElm)
    marker.on({
      mouseover: function() {
          if(!this.isClicked) {
              this.openPopup()
          }
      },
      mouseout: function() { 
          if(!this.isClicked) {
              this.closePopup()
          }
      },
      click: function() {
          this.isClicked = true
          this.openPopup()
      }
  })
  
  }
   initMap(): void {
    this.map = Leaflet.map('map', {
        center: [22.60, 75.80],
        zoom: 10
    });

    const tiles = Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.map.on ({
      click: function() {
          this.isClicked = false
      },
      popupclose: function () {
          this.isClicked = false
      }
  })

  }
  clearMarker(){
    for(var i=0;i<this.markers.length;i++){
      if (this.markers[i] != undefined) {
        this.map.removeLayer(this.markers[i]);
    };
    }
  }
}