// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShipListComponent } from './components/ship-list/ship-list.component';
import { AddShipComponent } from './components/add-ship/add-ship.component';
import { FleetsComponent } from './components/fleets/fleets.component';

const routes: Routes = [
  { path: 'ships', component: ShipListComponent },
  { path: 'add', component: AddShipComponent },
  { path: '', redirectTo: '/ships', pathMatch: 'full' },
  { path: 'fleets', component: FleetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
