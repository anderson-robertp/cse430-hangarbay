import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';
import { ShipListComponent } from './components/inventory/ship-list/ship-list.component';
import { AddShipComponent } from './components/inventory/add-ship/add-ship.component';
import { InventoryComponent } from './components/inventory/inventory.component';


@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    HeaderComponent,
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
