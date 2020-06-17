import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InnovationHubComponent } from './components/innovation-hub.component';
import { LandingViewComponent } from './shared/components/landing-view.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './services/auth-gaurd.service';


const routes: Routes = [{
  path: '', component: LandingViewComponent, canActivate: [AuthGaurdService]
},
  {
  path: 'innovation', component: InnovationHubComponent, canActivate: [AuthGaurdService]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'logout', component: LogoutComponent, canActivate: [AuthGaurdService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
