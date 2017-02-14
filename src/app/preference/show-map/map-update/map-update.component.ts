import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapCircle, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
@Component({
  selector: 'app-map-update',
  templateUrl: './map-update.component.html',
  styleUrls: ['./map-update.component.css']
})
export class MapUpdateComponent implements OnInit {
	@Input('position') set getPos(position){
		this.lat=position[0].coords.latitude;
		this.lng=position[0].coords.longitude;
	}
	@Output() onClose = new EventEmitter<any>();
	lat;
  tempPos;
	lng;
  message='Please wait till we find your location or you can manually set your location....';
  constructor(private http:Http) {
    if (navigator.geolocation) {
        var id=navigator.geolocation.watchPosition((position)=>{
          //console.log(position.coords);
          this.lat=position.coords.latitude;
          this.lng=position.coords.longitude;
          //navigator.geolocation.clearWatch(id);
          this.message='We found your location....';
        },(err)=>{
          //console.log(err);console.log("Navigator error fn");
          },
          { enableHighAccuracy: false, timeout: 3000, maximumAge: 0 }
        );
      }
  }
  coords;
  changed=false;
  markerDragEnd($event){
  	//console.log($event);
  	this.coords=$event;
    this.changed=true;
  }
  send(){
  	this.onClose.emit({"coords":{"latitude":this.coords.coords.lat,"longitude":this.coords.coords.lng}});
  }
  cancled(){
  	this.onClose.emit({"coords":{"latitude":this.lat,"longitude":this.lng}});
  }
  ngOnInit() {
  }

}
