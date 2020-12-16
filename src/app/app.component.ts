import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { WebSocketService } from './services/webSocket.service';
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent implements OnInit{

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  clicked:boolean=false;
  constructor(public service: WebSocketService,private markerService: MarkerService) {
    this.service.connect();
  }

  ngOnInit ( )  { 
    this.dropdownList = [
        { item_id: 357454075121887, item_text: '9728' },
        { item_id: 352093081151051, item_text: '4807' },
        { item_id: 357454075120749, item_text: '6334' },
        { item_id: 356917056656064, item_text: '9852' },
        { item_id: 356917057934932, item_text: '9201' },
        { item_id: 352093081638719, item_text: '7242' }
      ];
     
      this.dropdownSettings = {
        singleSelection: false,
        idField: 'item_id',
        textField: 'item_text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
      };       
    } 
   
    track(){
      if(this.selectedItems.length > 0){
        this.markerService.clearMarker();
        this.service.subscribeToTopic(this.selectedItems)
        this.clicked=true;
      }
    }
 
    
  itemSelected(item: any) {
    this.selectedItems.push(item)
   }
 
   onSelectAll(items: any) {
     this.selectedItems = items;
   }
 
   onDeSelectAll(items: any) {
     this.selectedItems = [];
   }
 
   onItemDeSelect(item: any) {
     this.selectedItems= this.selectedItems.filter((val)=>{
       return val.item_id != item.item_id
     })
   }
}
