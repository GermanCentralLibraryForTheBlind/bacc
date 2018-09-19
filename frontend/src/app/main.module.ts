import {MatToolbarModule, MatMenuModule, MatCardModule, MatIconModule, MatButtonModule, MatListModule, MatTableModule, MatProgressBarModule} from '@angular/material';
import {TranslateModule, TranslateModuleConfig, TranslateLoader} from '@ngx-translate/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {BrowserModule} from '@angular/platform-browser';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FileUploadModule} from 'ng2-file-upload';
import {MarkdownModule} from 'angular2-markdown';
import {PopoverModule} from 'ngx-popover';
import {NgModule} from '@angular/core';

import {CheckStateService} from './check-over/check.state.service';
import {CheckOverService} from './check-over/check-over.service';
import {HintOfficialComponent} from './hintOfficialVersion';
import {CheckOverComponent} from './check-over/check-over';
import {ShowRulesComponent} from './show-rules/show-rules';
import {UploadService} from './check-over/upload.service';
import {ReportService} from './report/report.service';
import {FeedbackComponent} from './feedback/feedback';
import {HeaderComponent} from './header/header';
import {ReportComponent} from './report/report';
import {LegendComponent} from './legend/legend';
import {InfoComponent} from './info/info';
import {AppComponent} from './main';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const translateConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient]
  }
};


@NgModule({
  declarations: [
    AppComponent,
    CheckOverComponent,
    HeaderComponent,
    ReportComponent,
    ShowRulesComponent,
    InfoComponent,
    FeedbackComponent,
    HintOfficialComponent,
    LegendComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatListModule,
    MatTableModule,
    BrowserAnimationsModule,
    FileUploadModule,
    MatProgressBarModule,
    HttpClientModule,
    PopoverModule,
    FormsModule,
    ReactiveFormsModule,
    // FileS,
    TranslateModule.forRoot(translateConfig),
    MarkdownModule.forRoot()
  ],
  exports: [],
  providers: [
    UploadService,
    CheckOverService,
    ReportService,
    CheckStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
