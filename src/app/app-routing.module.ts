// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';
import { FleetsComponent } from './components/fleets/fleets.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'ships', component: ShipListComponent },
  { path: 'add', component: AddShipComponent },
  { path: 'fleets', component: FleetsComponent },
  { path: 'chat', component: ChatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
