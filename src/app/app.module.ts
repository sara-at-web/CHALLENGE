import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatList, MatListModule, MatNavList } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MobxAngularModule } from 'mobx-angular';
import { NgxEchartsModule } from 'ngx-echarts';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EchartComponent } from './components/echart/echart.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { DataPreviewComponent } from './pages/data-preview/data-preview.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ChallengeService } from './services/challenge.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ChallengeComponent,
    DataPreviewComponent,
    EchartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MobxAngularModule,
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    PerfectScrollbarModule,
    MatListModule,
    MatSidenavModule
  ],
  providers: [
    ChallengeService,
    MatList,
    MatNavList,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
