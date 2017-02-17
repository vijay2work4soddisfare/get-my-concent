import { 
	Component,
	Output,
	EventEmitter,
	OnInit,
	Input
	 } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-animate',
  templateUrl: './animate.component.html',
  styleUrls: ['./animate.component.css']
})
export class AnimateComponent implements OnInit{
	@Output() onClose = new EventEmitter<boolean>();
	list=[];
	tempStore=[];
	i=1;
	limit=6;
	completedAnim=false;
	clearButton=false;
	clearset=false;
	pageNo=0;
	ngOnInit(){
	}
	logged=false;
	showVid=false;
	back=false;
	percentage=10;
	calcPercentage(){
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
  constructor(private af:AngularFire) { 
  	//console.log("const");
  	this.calcPercentage();
  	this.showVid=false;
	this.back=false;
  	this.af.auth.subscribe(auth=>{
  		if(auth!=undefined && auth!=null) {
  			this.logged=true;
  		}
  	});
	this.tempStore[0]='Marriage is not a license to rape';
	this.tempStore[1]='Stop Marital rape too';
	this.tempStore[2]='Only Yes is a consent';
	this.tempStore[3]='Non-consentual sex is rape';
	this.tempStore[4]='If she is asleep then it means no';
	this.tempStore[5]='It is a man issue';
	this.recurAdd();
  	setTimeout(()=>{
		this.clearButton=true;
	},1010);
	this.af.database.object("education/",{preserveSnapshot : true}).subscribe(snapshots=>{
		if(snapshots.exists()) {
			var i=this.tempStore.length;
			this.limit=snapshots.numChildren()+i;
			snapshots.forEach(snapshot=>{
				this.tempStore[i]=snapshot.val().value;
				i++;
			});
		}else{
			this.limit=this.tempStore.length;
		}
	});
  }
	recurAdd(){
		if(this.list.length<6 && this.i<=this.limit && this.tempStore[this.i-1]!=undefined && !this.skipped) {
				this.list.push({"val":""+this.tempStore[this.i-1],"state":"in"});
				this.i++;
			setTimeout(()=>{
				this.recurAdd();
			},1000);	
		}else{
			this.pageNo++;
		}
		if(this.i==this.limit+1) {
			this.completedAnim=true;
		}
	}
	recurDel(len){
		if(len!=0) {
			this.list[len-1].state="out";
			setTimeout(()=>{
				this.list.pop();
				len--;
				this.recurDel(len);
			},1010);
		}else{
			if(!this.clearButton && !this.gotoButton && this.i>=this.limit) {
				this.exit();
			}else{
	  			setTimeout(()=>{
					this.clearButton=true;
				},1010);
				this.recurAdd();
			}
			if(this.skipped) {
				this.exit();
			}
		}
	}
	skipped=false;
  clearAnim(){
  	this.clearButton=false;
  	this.skipped=true;
  	this.recurDel(this.list.length);
  }
  exit(){
	if(!this.showVid) {
		this.back=true;
		this.showVid=true;
	}else{
		this.onClose.emit(true);
	}
  }
  education(){
  	this.skipped=false;
  	this.showVid=false;
	this.pageNo=0;
  	this.i=1;
	this.completedAnim=false;
	this.clearButton=false;
	this.clearset=false;
  	this.back=false;
  	this.recurAdd();
  	setTimeout(()=>{
		this.clearButton=true;
	},1010);
  	this.gotoButton=true;
  }
  gotoButton=true;
  gotoConcent(){
  	this.clearAnim();
  	this.clearButton=false;
  	this.gotoButton=false;
  }
}
