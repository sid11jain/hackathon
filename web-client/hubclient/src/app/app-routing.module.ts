import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InnovationHubComponent} from "./components/innovation-hub/innovation-hub.component";


const routes: Routes = [{
  path: 'innovation', component: InnovationHubComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
