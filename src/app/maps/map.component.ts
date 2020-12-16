import { AfterViewInit, Component, Inject,ViewChild,ViewContainerRef,TemplateRef } from '@angular/core';
import { MarkerService } from '../services/marker.service';
import { WebSocketService } from '../services/webSocket.service';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {

  constructor( private markerService: MarkerService,private service: WebSocketService) {
  }
   infoDevices=[]
   isClicked:boolean = false
  
  ngAfterViewInit(): void {
    this.markerService.initMap();
    this.markerService.map.invalidateSize();
    this.service.markers$.subscribe((val)=>{
      this.infoDevices=this.service.selectedDevices;
      if(val){
        this.infoDevices = this.service.selectedDevices.filter((info)=>{
          return info.item_id != val.imei
        })
        if(this.infoDevices.length> 0){
          this.service.note="Note: GPS data not yet received for some of the devices";
        }else{
          this.service.note="";
        }
          this.markerService.addMarker(val)
      }
    })
  }
}