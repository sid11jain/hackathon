import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnovationHubComponent } from './components/innovation-hub/innovation-hub.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {InnovationsHubService} from "./services/innovations-hub.service";

@NgModule({
  declarations: [
    AppComponent,
    InnovationHubComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InnovationsHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
