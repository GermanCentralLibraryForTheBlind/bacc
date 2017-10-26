import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FileUploadModule} from "ng2-file-upload";
import {JasperoAlertsModule} from "@jaspero/ng2-alerts";
import {TranslateModule, TranslateModuleConfig, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdToolbarModule,
  MdMenuModule,
  MdCardModule,
  MdIconModule,
  MdButtonModule,
  MdListModule,
  MdTableModule,
  MdProgressBarModule

} from '@angular/material';

import {AppComponent} from './main';
import {CheckOverComponent} from './check-over/check-over';
import {HeaderComponent} from './header/header';
import {SidebarComponent} from './sidebar/sidebar';
import {ReportComponent} from './report/report';
import {UploadService} from "./check-over/upload.service";
import {CheckOverService} from "./check-over/check-over.service";
import {ReportService} from "./report/report.service";
import {ModalComponent} from './report/modal';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translateConfig : TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};

const routes: Routes = [
  // {path: 'co', component: CheckOverComponent},
  {path: 'report', component: ReportComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CheckOverComponent,
    HeaderComponent,
    SidebarComponent,
    ReportComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    MdToolbarModule,
    MdMenuModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    FlexLayoutModule,
    MdListModule,
    MdTableModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MdProgressBarModule,
    HttpModule,
    JasperoAlertsModule,
    HttpClientModule,
    TranslateModule.forRoot(translateConfig),
    RouterModule.forRoot(routes)
  ],
  exports: [],
  providers: [
    RouterModule,
    UploadService,
    CheckOverService,
    ReportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
