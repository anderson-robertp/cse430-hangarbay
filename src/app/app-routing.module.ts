// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipListComponent } from './components/inventory/ship-list/ship-list.component';
import { AddShipComponent } from './components/inventory/add-ship/add-ship.component';
import { FleetsComponent } from './components/fleets/fleets.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'ships', component: ShipListComponent },
  { path: 'add', component: AddShipComponent },
  { path: 'fleets', component: FleetsComponent },
  { path: 'chat', component: ChatListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
