import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthResolveService } from '../auth-resolve.service';
@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css'],
  providers:[AuthResolveService]
})
export class GuestComponent implements OnInit {
  constructor(private router:Router,private r:ActivatedRoute, private auth:AuthResolveService) { }
  login(){
    this.auth.login();
  }
  ngOnInit() {
  }

}
