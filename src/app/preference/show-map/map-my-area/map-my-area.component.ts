import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { AngularFire,FirebaseListObservable, FirebaseObjectObservable, } from 'angularfire2';
import { MdDialogRef,MdDialog } from '@angular/material';
import { TaskService } from '../../task-service';
import { SebmGoogleMap, SebmGoogleMapMarker, SebmGoogleMapCircle, SebmGoogleMapInfoWindow } from 'angular2-google-maps/core';
var sUser;
var visible;
@Component({
  selector: 'app-map-my-area',
  templateUrl: './map-my-area.component.html',
  styleUrls: ['./map-my-area.component.css']
})
export class MapMyAreaComponent{
	@Input('position') set getPos(position){
		//console.log(position);
		this.lat=position[0].coords.latitude;
		this.lng=position[0].coords.longitude;
	}
	@Output() onClose = new EventEmitter<boolean>();
	@Output() getUid = new EventEmitter<any>();
	zoom=16;
	otherUsers=[];
	lat;
	lng;
	otheruser:FirebaseListObservable<any>;
	latGreat:FirebaseListObservable<any>;
	latLess:FirebaseListObservable<any>;
	lngGreat:FirebaseListObservable<any>;
	lngLess:FirebaseListObservable<any>;
	dialogRef: MdDialogRef<PizzaDialog>;
	dialogVRef: MdDialogRef<VisibilityDialog>;
	uid;
	mySavedLocation:FirebaseObjectObservable<any>;
	toogleVisible(visible){
		//console.log(visible);
		this.mySavedLocation=this.af.database.object("accounts/"+this.uid+"/");
		  if(!visible) {
		    this.mySavedLocation.update({"visible":false});
		    this.af.database.object("otherUsers/"+this.uid).remove().then(()=>{
				this.visible=false;
				this.othersList=[];
		    });
		  }else{
		    this.mySavedLocation.update({"visible":true});
		    this.mySavedLocation.subscribe(data=>{
				this.othersList=[];
			    this.af.database.object("otherUsers/"+this.uid).update({
			    	"latitude":data.latitude,
			    	"longitude":data.longitude,
			    	"pic":this.user.photoURL,
			    	"name":this.user.displayName
			    }).then(()=>{
					this.visible=true;
			    });
		    });
		  }
	}
	visible;
	user;
  constructor(public dialog: MdDialog,private af:AngularFire) {
  	this.otheruser=this.af.database.list("otherUsers/");
  	this.af.auth.subscribe(auth=>{
  		if(auth!=undefined && auth!=null) {
  			this.uid=auth.uid;
  			this.user=auth.auth;
			this.mySavedLocation=this.af.database.object("accounts/"+auth.uid+"/");
			this.mySavedLocation.subscribe(data=>{
				this.visible=data.visible;
			});
  		}
  	});
  }
  toogleVisibleDiag(visibleVal){
  	visible=visibleVal;
  	this.dialogVRef=this.dialog.open(VisibilityDialog,{disableClose:false});
  	this.dialogVRef.afterClosed().subscribe(result => {
  		if(result!=undefined && result!=null) {
      		this.toogleVisible(result);
      		this.visible=visible;
  		}
      this.dialogVRef = null;
    });
  }
  openDialog(item) {
  	sUser=item;
  	//console.log("item in dig fn",item);
  	//console.log("global suser in dig fn",sUser);
    this.dialogRef = this.dialog.open(PizzaDialog, {
      disableClose: false
    });

    this.dialogRef.afterClosed().subscribe(result => {
  		//console.log("closed : ",result);
    	if(result!=undefined) {
		    this.getUid.emit(result);
    	}
      this.dialogRef = null;
    });
  }

  	showOthers(){
  		this.getAllLists();
  		this.compWithLat();
	}
	send(){
		this.onClose.emit(true);
	}
	getAllLists(){
	  	this.lngGreatMap();
	  	this.lngLessMap();
	  	this.latLessMap();
	  	this.latGreatMap();
	}
	othersList=[];
	addToOtherUser(x){
		this.othersList.push({"latitude":x.latitude,"longitude":x.longitude,"name":x.name,"pic":x.pic,"uid":x.$key,"mobile":x.mobile});
		//console.log(this.othersList);
	}
	compWithLat(){
		this.getAllLists();
	 	//console.log("Compare with Lat");
	  	this.latLess.subscribe(snapshot=>{
//	  		console.log("lat less",snapshot);
	  		if(snapshot.length>0) {
		  		snapshot.map(y => {
		  			//console.log(y);
		  			this.lngLess.subscribe(lngLessVal=>{
		  				lngLessVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						//console.log(y);
			  						this.addToOtherUser(y);
		  						}
		  					}
		  				});
		  			});
		  			this.lngGreat.subscribe(lngGreatVal=>{
		  				lngGreatVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						//console.log(y);
		  						}
		  					}
		  				});
		  			});
		  		});
	  		}
	  	});
	  	this.latGreat.subscribe(snapshot=>{
//	  		console.log("lat Great",snapshot);
	  		if(snapshot.length>0) {
		  		snapshot.map(y => {
		  			//console.log(y);
		  			this.lngLess.subscribe(lngLessVal=>{
		  				lngLessVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						//console.log(y);
		  						}
		  					}
		  				});
		  			});
		  			this.lngGreat.subscribe(lngGreatVal=>{
		  				lngGreatVal.map(x=>{
		  					//console.log("lnglessVal",x);
		  					if(x.latitude==y.latitude) {
		  						if(y.latitude!=this.lat && y.longitude!=this.lng) {
			  						this.addToOtherUser(y);
			  						//console.log(y);
		  						}
		  					}
		  				});
		  			});
		  		});
	  		}
	  	});
		
	}
	
	latLessMap(){
		//console.log("latLess");
  	  	this.latLess=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'latitude',
	  		endAt: this.lat,
	  		limitToLast:5
	  	}});
	}

	latGreatMap(){
		//console.log("latGreat");
	  	this.latGreat=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'latitude',
	  		startAt: this.lat,
	  		limitToFirst:5
	  	}});
	}
	lngLessMap(){
		//console.log("latGreat");
	  	this.lngLess=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'longitude',
	  		endAt: this.lng,
	  		limitToLast:5
	  	}});
	}
	lngGreatMap(){
		//console.log("lngGreat");
	  	this.lngGreat=this.af.database.list("otherUsers/",{query:{
	  		orderByChild:'longitude',
	  		startAt: this.lng,
	  		limitToFirst:5
	  	}});
	}
}
@Component({
  selector: 'pizza-dialog',
  templateUrl:'./dialog.component.html',
  providers:[TaskService]
})
export class PizzaDialog {
	sUserD;
	add=true;
	fetchedResult;
  constructor(public dialogRef: MdDialogRef<PizzaDialog>,private af:AngularFire,private taskService:TaskService) { 
  		this.sUserD=sUser;
  		af.auth.subscribe(user=>{
  			if(user!=undefined) {
  				af.database.list("accounts/"+user.auth.uid,{query:{
  					orderByChild:"mobile",
  					equalTo:this.sUserD.mobile
  				}}).first().subscribe(data=>{
  					if(data.length==0) {
  						this.add=true;
  					}else{
  						data.map(x=>{
  							this.fetchedResult=x;
  						});
  						this.add=false;
  					}
  				});	
  			}
  		});
  		//console.log("global",sUser);
  		//console.log("local",this.sUserD);
  }
  closedia(){
  	//console.log("fetched result : ",this.fetchedResult);
  	this.taskService.removeTask(this.fetchedResult);
  	this.dialogRef.close();
  }
}

@Component({
  selector: 'visible-dialog',
  templateUrl:'./visible.component.html'
})
export class VisibilityDialog {
	visible;
  constructor(public dialogVRef: MdDialogRef<VisibilityDialog>) { 
  		this.visible=visible;
  }
  toog(visibleChange){
  	//console.log("change : ",visibleChange);
  	visible=visibleChange.checked;
  	this.visible=visibleChange.checked;
  }
}