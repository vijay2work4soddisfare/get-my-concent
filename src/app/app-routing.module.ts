import { NgModule } from '@angular/core';
import { Routes, RouterModule,PreloadAllModules } from '@angular/router';
import { AuthGuard }                from './auth-guard.service';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
  {path: '',redirectTo:'Welcome',pathMatch:'full'},
  {path:'Welcome',loadChildren:'app/welcome/welcome.module#WelcomeModule',data:{preload:true}},
  {path:'Guest',loadChildren:'app/guest/guest.module#GuestModule',data:{preload:true}},
  {path:'Preference',loadChildren:'app/preference/preference.module#PreferenceModule', canLoad: [AuthGuard]},
  {path:'Partners',loadChildren:'app/partners/partners.module#PartnersModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy:SelectivePreloadingStrategy})],
  exports: [RouterModule],
  providers: [SelectivePreloadingStrategy,AuthGuard]
})
export class AppRoutingModule { }
