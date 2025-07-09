import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ShipListComponent } from './components/ship-list/ship-list.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';


@NgModule({
  declarations: [
    AppComponent,
    ShipListComponent,
    AddShipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
