import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
	@Output() closed = new EventEmitter<boolean>();
  constructor() { }
  close(event){
  	this.closed.emit(true);
  }
  ngOnInit() {
  }

}
