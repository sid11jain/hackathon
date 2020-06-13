import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnovationHubComponent } from './components/innovation-hub.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, ɵNgSelectMultipleOption} from '@angular/forms';
import {InnovationsHubService} from './services/innovations-hub.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InnovationHubIdeaComponent } from './components/innovation-hub-idea.component';
import { InnovationHubSelectOptionComponent } from './components/common/innovation-hub-select-option.component';

@NgModule({
  declarations: [
    AppComponent,
    InnovationHubComponent,
    InnovationHubIdeaComponent,
    InnovationHubSelectOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [InnovationsHubService],
  bootstrap: [AppComponent]
})
export class AppModule { }
