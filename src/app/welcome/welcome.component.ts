import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
//import { AuthService } from '../auth.service';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private router:Router,private r:ActivatedRoute) { }
  ok(){

  	this.router.navigate(['../','Guest'],{relativeTo:this.r});
  }
  ngOnInit() {
  }

}
