// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';

const routes: Routes = [
  { path: '', component: ShipListComponent },
  { path: 'add', component: AddShipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
