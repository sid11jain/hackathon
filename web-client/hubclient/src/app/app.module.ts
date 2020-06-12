import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnovationHubComponent } from './components/innovation-hub.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InnovationsHubService} from './services/innovations-hub.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InnovationHubIdeaComponent } from './components/innovation-hub-idea.component';

@NgModule({
  declarations: [
    AppComponent,
    InnovationHubComponent,
    InnovationHubIdeaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [InnovationsHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
