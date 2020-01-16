import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AccomodationComponent } from './accomodation/accomodation.component';
import {FormsModule} from '@angular/forms';
import {AppConfigService} from "./app-config.service";
import {AccomodationHttpService} from "./accomodation/accomodation-http.service";


@NgModule({
  declarations: [
    AppComponent,
    AccomodationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [AppConfigService, AccomodationHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
