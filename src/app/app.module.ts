import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { InventoryAddComponent } from './components/inventory/inventory-add/inventory-add.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { FleetsComponent } from './components/fleets/fleets.component';
import { FleetListComponent } from './components/fleets/fleet-list/fleet-list.component';
import { FleetEditComponent } from './components/fleets/fleet-edit/fleet-edit.component';
import { FleetItemComponent } from './components/fleets/fleet-item/fleet-item.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';
import { ChatEditComponent } from './components/chat/chat-edit/chat-edit.component';
import { ChatItemComponent } from './components/chat/chat-item/chat-item.component';


@NgModule({
  declarations: [
    AppComponent,
    InventoryComponent,
    HeaderComponent,
    InventoryListComponent,
    InventoryAddComponent,
    FleetsComponent,
    FleetListComponent,
    FleetEditComponent,
    FleetItemComponent,
    ChatComponent,
    ChatListComponent,
    ChatEditComponent,
    ChatItemComponent
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
