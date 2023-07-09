import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { Routes, RouterModule } from "@angular/router";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { NgScrollbarModule } from "ngx-scrollbar";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { NgApexchartsModule } from "ng-apexcharts";
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ToolbarComponent,
    GameComponent
  ],
  imports: [
    RouterModule,
    RouterModule.forRoot([
      {path: '', component: DashboardComponent},
      {path: 'games', component: GameComponent}
    ]),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    MatToolbarModule,
    MatIconModule,
    NgScrollbarModule,
    MatCardModule,
    MatButtonModule,
    NgApexchartsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
