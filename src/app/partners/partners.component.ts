import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {MdDialog, MdDialogRef} from '@angular/material';
@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit {
	constructor(public dialogRef: MdDialogRef<PartnersComponent>,private af:AngularFire){
		this.calcPercentage();
	}
  ngOnInit() {
  }
  percentage=10;
	calcPercentage(){
		this.percentage=0;
		var countReports;
		var countUsers;
		this.af.database.list("accounts/",{query:{
			orderByChild:"reported",
			equalTo:true
		}}).subscribe(dataR=>{
			//console.log("reported count : ",dataR.length);
			countReports=dataR.length;
			this.af.database.list("accounts/",{query:{
				orderByChild:"gender",
				equalTo:"Female"
			}}).subscribe(dataU=>{
				//console.log("total female users : ",dataU.length);
				if(dataU.length==0) {
					countUsers=1;
					this.persentageReturn(countReports,countUsers);
				}else{
					countUsers=dataU.length;
					this.persentageReturn(countReports,countUsers);
				}
			});
		});
	}
	persentageReturn(count,total){
		this.percentage=(count/total)*100;
		//console.log("percentage : ",this.percentage);
	}

}
