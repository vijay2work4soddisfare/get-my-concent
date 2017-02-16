import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreferenceRoutingModule } from './preference-routing.module';
import { PreferenceComponent,DialogResultExampleDialog } from './preference.component';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FormComponent } from './form/form.component';
import { CrisisService }        from './crisis.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule,MdDialog } from '@angular/material';
import 'hammerjs';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { ShowMapComponent } from './show-map/show-map.component';
import { MapMyAreaComponent,PizzaDialog,VisibilityDialog  } from './show-map/map-my-area/map-my-area.component';
import { MapUpdateComponent } from './show-map/map-update/map-update.component';
@NgModule({
  imports: [
  	ReactiveFormsModule,
    CommonModule,
    PreferenceRoutingModule,
    MaterialModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC4PhTFV8sWVsmHE2-2sT2ohUQYy4m_o9U'
    })
  ],
  declarations: [PreferenceComponent, FormQuestionComponent, FormComponent,DialogResultExampleDialog, ShowMapComponent, MapMyAreaComponent, MapUpdateComponent,PizzaDialog,VisibilityDialog ],
  entryComponents:[DialogResultExampleDialog,PizzaDialog,VisibilityDialog,ShowMapComponent ],
  providers:[MdDialog,CrisisService]
})
export class PreferenceModule { }
