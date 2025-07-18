import { Component,Input, Output, EventEmitter } from '@angular/core';

import { Fleet } from '../fleet.model';

@Component({
  selector: 'app-fleet-list',
  standalone: false,
  templateUrl: './fleet-list.component.html',
  styleUrl: './fleet-list.component.scss'
})



export class FleetListComponent {
  @Input() fleets: Fleet[] = [];
  @Output() select = new EventEmitter<Fleet>();
  @Output() delete = new EventEmitter<Fleet>();
}
