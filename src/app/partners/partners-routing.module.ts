import { TasksComponent } from './components/tasks';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PartnersComponent } from './partners.component';
const routes: Routes = [
	{path: '', component: TasksComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PartnersRoutingModule { }
