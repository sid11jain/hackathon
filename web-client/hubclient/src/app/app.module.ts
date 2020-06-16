import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnovationHubComponent } from './components/innovation-hub.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule, ɵNgSelectMultipleOption} from '@angular/forms';
import { InnovationsHubService } from './services/innovations-hub.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { InnovationHubIdeaComponent } from './components/innovation-hub-idea.component';
import { InnovationHubSelectOptionComponent } from './components/common/innovation-hub-select-option.component';
import { BasicCardComponent } from './shared/components/basic-card.component';
import { LandingViewComponent } from './shared/components/landing-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExportExcelService } from './services/export-excel.service';
import { BsModalService, ModalModule, BsModalRef } from 'ngx-bootstrap/modal';
import { InnovationHubCardComponent } from './components/common/innovation-hub-card/innovation-hub-card.component';
import { HubCampaignCardComponent } from './components/common/innovation-hub-card/hub-campaign-card.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    InnovationHubComponent,
    InnovationHubIdeaComponent,
    BasicCardComponent,
    InnovationHubSelectOptionComponent,
    LandingViewComponent,
    InnovationHubCardComponent,
    HubCampaignCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule ,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    BrowserAnimationsModule
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
   providers: [InnovationsHubService, ExportExcelService, BsModalService, BsModalRef],
  bootstrap: [AppComponent]
})
export class AppModule { }
