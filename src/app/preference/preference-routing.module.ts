import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreferenceComponent } from './preference.component';

import { CrisisDetailResolver }   from './crisis-detail-resolver.service';
import { CanDeactivateGuard }     from './can-deactivate-guard.service';

const routes: Routes = [
	{path:'',component:PreferenceComponent, canDeactivate: [CanDeactivateGuard],resolve: { crisis: CrisisDetailResolver} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [CrisisDetailResolver,CanDeactivateGuard]
})
export class PreferenceRoutingModule { }