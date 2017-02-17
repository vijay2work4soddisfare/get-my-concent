import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { PartnersRoutingModule } from './partners-routing.module';
import { PartnersComponent } from './partners.component';

import { TaskFormComponent } from './components/task-form';
import { TaskItemComponent } from './components/task-item';
import { TaskListComponent } from './components/task-list';
import { AutoFocusDirective } from './directives/autofocus-directive';
import { TaskService } from './services/task-service';
import { TasksComponent } from './components/tasks';
import { ShowDialog } from './components/showDialog.component';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { FormQuestionComponent } from './form-question/form-question.component';
import { FormComponent } from './form/form.component';

@NgModule({
  imports: [
	    CommonModule,
	    PartnersRoutingModule,
	    FormsModule,
	    ReactiveFormsModule,
	    MaterialModule.forRoot()
	],
  declarations: [
  		FormQuestionComponent,
  		FormComponent,
	  	PartnersComponent,
	    AutoFocusDirective,
	    TaskFormComponent,
	    TaskItemComponent,
	    TaskListComponent,
	    TasksComponent,
	    ShowDialog
	],
	entryComponents:[ShowDialog,TaskFormComponent,PartnersComponent],
  providers: [
    TaskService
  ]
})
export class PartnersModule { }
export { TaskService };
