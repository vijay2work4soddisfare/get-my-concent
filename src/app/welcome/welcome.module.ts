import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';
import { AuthService }                from '../auth.service';

@NgModule({
  imports: [
    CommonModule,
    WelcomeRoutingModule
  ],
  providers:[AuthService],
  declarations: [WelcomeComponent]
})
export class WelcomeModule { }
