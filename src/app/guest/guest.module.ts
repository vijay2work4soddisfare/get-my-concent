import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from './guest-routing.module';
import { GuestComponent } from './guest.component';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { EducationComponent } from './education/education.component';
import { AnimateComponent } from './education/animate/animate.component';
import { ListItemComponent } from './education/list-item/list-item.component';
@NgModule({
  imports: [
    CommonModule,
    GuestRoutingModule,
    MaterialModule.forRoot()
  ],
  providers:[],
  declarations: [GuestComponent, EducationComponent, AnimateComponent, ListItemComponent]
})
export class GuestModule { }
