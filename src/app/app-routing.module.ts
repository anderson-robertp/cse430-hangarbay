// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { InventoryAddComponent } from './components/inventory/inventory-add/inventory-add.component';
import { FleetsComponent } from './components/fleets/fleets.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { ChatListComponent } from './components/chat/chat-list/chat-list.component';

const routes: Routes = [
  { path: '', component: InventoryComponent },
  { path: 'fleets', component: FleetsComponent },
  { path: 'chat', component: ChatListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
