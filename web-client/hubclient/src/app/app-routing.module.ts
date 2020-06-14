import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnovationHubComponent } from './components/innovation-hub.component';
import { LandingViewComponent } from './shared/components/landing-view.component';


const routes: Routes = [{
  path: '', component: LandingViewComponent
},
  {
  path: 'innovation', component: InnovationHubComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
