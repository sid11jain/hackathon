import { BrowserModule } from '@angular/platform-browser';
import {
  NgModule,
  NO_ERRORS_SCHEMA,
  CUSTOM_ELEMENTS_SCHEMA,
  Injectable,
} from '@angular/core';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InnovationHubComponent } from './components/innovation-hub.component';
import {
  HttpClientModule,
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import {
  FormsModule,
  ReactiveFormsModule,
  ɵNgSelectMultipleOption,
} from '@angular/forms';
import { InnovationsHubService } from './services/innovations-hub.service';
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
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BasicCardCommentsComponent } from './shared/components/basic-card-comments.component';
import { HubInputChipsComponent } from './components/common/hub-input-chips/hub-input-chips.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TagInputModule } from 'ngx-chips';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { BasicAuthHttpInterceptorService } from './services/basic-auth-interceptor.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CardFooterComponent } from './shared/components/card-footer.component';
import { UsernameToFullNamePipe } from './shared/components/username-to-fullname.pipe';
import { CreateCampaignComponent } from './components/create-campaign/create-campaign.component';
import { HubFilterPanelComponent } from './components/common/hub-filter-panel/hub-filter-panel.component';
import { DatePipe } from '@angular/common';
import { HubDatePickerComponent } from './components/common/hub-date-picker/hub-date-picker.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest'),
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    InnovationHubComponent,
    InnovationHubIdeaComponent,
    BasicCardComponent,
    InnovationHubSelectOptionComponent,
    LandingViewComponent,
    InnovationHubCardComponent,
    HubCampaignCardComponent,
    LoginComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    BasicCardCommentsComponent,
    HubInputChipsComponent,
    CardFooterComponent,
    UsernameToFullNamePipe,
    CreateCampaignComponent,
    HubFilterPanelComponent,
    HubDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    Ng2SearchPipeModule,
    TagInputModule,
    NgxTypeaheadModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    InnovationsHubService,
    ExportExcelService,
    BsModalService,
    BsModalRef,
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
